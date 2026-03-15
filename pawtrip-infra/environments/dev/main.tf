# ──────────────────────────────────────────────
# PawTrip — Dev Environment
# ──────────────────────────────────────────────

locals {
  environment = "dev"
  project_id  = "pawtrip-dev"
}

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = local.project_id
  region  = var.region
  zone    = var.zone
}

provider "google-beta" {
  project = local.project_id
  region  = var.region
  zone    = var.zone
}

# ── Project ──────────────────────────────────

module "project" {
  source = "../../modules/project"

  project_name       = "PawTrip Dev"
  project_id         = local.project_id
  billing_account_id = var.billing_account_id
  org_id             = var.org_id
  environment        = local.environment
}

# ── Networking ───────────────────────────────

module "networking" {
  source = "../../modules/networking"

  project_id  = module.project.project_id
  region      = var.region
  environment = local.environment

  subnet_cidr    = "10.0.0.0/20"
  connector_cidr = "10.8.0.0/28"

  depends_on = [module.project]
}

# ── Database ─────────────────────────────────

module "database" {
  source = "../../modules/database"

  project_id             = module.project.project_id
  region                 = var.region
  environment            = local.environment
  vpc_id                 = module.networking.vpc_id
  private_vpc_connection = module.networking.private_vpc_connection
  db_password            = var.db_password_dev
  db_tier                = "db-f1-micro"
  disk_size_gb           = 10
  deletion_protection    = false

  depends_on = [module.networking]
}

# ── Storage ──────────────────────────────────

module "storage" {
  source = "../../modules/storage"

  project_id  = module.project.project_id
  region      = var.region
  environment = local.environment

  depends_on = [module.project]
}

# ── IAM ──────────────────────────────────────

module "iam" {
  source = "../../modules/iam"

  project_id  = module.project.project_id
  environment = local.environment

  depends_on = [module.project]
}

# ── Secrets ──────────────────────────────────

module "secrets" {
  source = "../../modules/secrets"

  project_id                 = module.project.project_id
  environment                = local.environment
  jwt_secret                 = var.jwt_secret
  db_password                = var.db_password_dev
  google_maps_api_key        = var.google_maps_api_key
  google_oauth_client_id     = var.google_oauth_client_id
  google_oauth_client_secret = var.google_oauth_client_secret

  depends_on = [module.project]
}

# ── Artifact Registry ────────────────────────

module "registry" {
  source = "../../modules/registry"

  project_id  = module.project.project_id
  region      = var.region
  environment = local.environment

  depends_on = [module.project]
}

# ── Monitoring ───────────────────────────────

module "monitoring" {
  source = "../../modules/monitoring"

  project_id         = module.project.project_id
  project_number     = module.project.project_number
  billing_account_id = var.billing_account_id
  environment        = local.environment
  alert_email        = var.alert_email
  alert_amount       = 50 # Dev: $50/month

  depends_on = [module.project]
}
