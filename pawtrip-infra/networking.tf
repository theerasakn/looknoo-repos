# ──────────────────────────────────────────────
# PawTrip GCP — VPC & Networking
# ──────────────────────────────────────────────

resource "google_compute_network" "vpc" {
  name                    = "${local.prefix}-vpc"
  auto_create_subnetworks = false
  project                 = var.project_id

  depends_on = [google_project_service.apis]
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${local.prefix}-subnet"
  ip_cidr_range = "10.10.0.0/24"
  region        = var.region
  network       = google_compute_network.vpc.id

  private_ip_google_access = true
}

# ── Private Service Connection (Cloud SQL) ───

resource "google_compute_global_address" "private_ip_range" {
  name          = "${local.prefix}-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc.id
}

resource "google_service_networking_connection" "private_vpc" {
  network                 = google_compute_network.vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_range.name]

  depends_on = [google_project_service.apis]
}

# ── VPC Connector (Cloud Run → Cloud SQL) ────

resource "google_vpc_access_connector" "connector" {
  name          = "${local.prefix}-conn"
  region        = var.region
  ip_cidr_range = "10.8.0.0/28"
  network       = google_compute_network.vpc.name

  min_instances = 2
  max_instances = 3

  depends_on = [google_project_service.apis]
}
