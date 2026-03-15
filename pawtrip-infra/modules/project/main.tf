# ──────────────────────────────────────────────
# Module: project — GCP Project + API enablement
# ──────────────────────────────────────────────

resource "google_project" "pawtrip" {
  name            = var.project_name
  project_id      = var.project_id
  billing_account = var.billing_account_id
  org_id          = var.org_id != "" ? var.org_id : null

  labels = {
    app         = "pawtrip"
    environment = var.environment
    managed_by  = "terraform"
  }
}

# Wait for billing account association to propagate
resource "time_sleep" "wait_for_billing" {
  depends_on      = [google_project.pawtrip]
  create_duration = "60s"
}

# Enable required GCP APIs
resource "google_project_service" "apis" {
  for_each = toset([
    "compute.googleapis.com",
    "sqladmin.googleapis.com",
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "secretmanager.googleapis.com",
    "servicenetworking.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "maps-backend.googleapis.com",
    "places-backend.googleapis.com",
    "geocoding-backend.googleapis.com",
    "directions-backend.googleapis.com",
    "storage.googleapis.com",
    "cloudbuild.googleapis.com",
    "billingbudgets.googleapis.com",
  ])

  project                    = google_project.pawtrip.project_id
  service                    = each.value
  disable_dependent_services = false
  disable_on_destroy         = false

  depends_on = [time_sleep.wait_for_billing]
}
