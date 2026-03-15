# ──────────────────────────────────────────────
# Module: networking — VPC + subnets + private service access
# ──────────────────────────────────────────────

resource "google_compute_network" "vpc" {
  name                    = "pawtrip-vpc-${var.environment}"
  project                 = var.project_id
  auto_create_subnetworks = false
  routing_mode            = "REGIONAL"
}

resource "google_compute_subnetwork" "primary" {
  name                     = "pawtrip-subnet-${var.environment}"
  project                  = var.project_id
  region                   = var.region
  network                  = google_compute_network.vpc.id
  ip_cidr_range            = var.subnet_cidr
  private_ip_google_access = true
}

# Private Service Access — required for Cloud SQL private IP
resource "google_compute_global_address" "private_ip_range" {
  name          = "pawtrip-private-ip-${var.environment}"
  project       = var.project_id
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 20
  network       = google_compute_network.vpc.id
}

resource "google_service_networking_connection" "private_vpc" {
  network                 = google_compute_network.vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_range.name]
}

# Serverless VPC Connector — for Cloud Run → Cloud SQL
resource "google_vpc_access_connector" "serverless" {
  name          = "pawtrip-vpc-cx-${var.environment}"
  project       = var.project_id
  region        = var.region
  ip_cidr_range = var.connector_cidr
  network       = google_compute_network.vpc.name

  min_instances = var.environment == "prod" ? 2 : 2
  max_instances = var.environment == "prod" ? 5 : 3
}
