# ──────────────────────────────────────────────
# PawTrip GCP — Main Configuration
# ──────────────────────────────────────────────

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
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

# ── Locals ───────────────────────────────────

locals {
  prefix    = "pawtrip-${var.environment}"
  db_name   = "pawtrip"
  db_user   = "pawtrip"
  sa_api    = "${local.prefix}-api"
}

# ── Enable Required APIs ────────────────────

resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "sqladmin.googleapis.com",
    "sql-component.googleapis.com",
    "storage.googleapis.com",
    "vpcaccess.googleapis.com",
    "secretmanager.googleapis.com",
    "maps-backend.googleapis.com",
    "places-backend.googleapis.com",
    "geocoding-backend.googleapis.com",
    "directions-backend.googleapis.com",
    "iam.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "servicenetworking.googleapis.com",
    "compute.googleapis.com",
    "artifactregistry.googleapis.com",
  ])

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}
