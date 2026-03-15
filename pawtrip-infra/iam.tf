# ──────────────────────────────────────────────
# PawTrip GCP — IAM & Service Accounts
# ──────────────────────────────────────────────

# ── API Service Account ──────────────────────

resource "google_service_account" "api" {
  account_id   = local.sa_api
  display_name = "PawTrip API (${var.environment})"

  depends_on = [google_project_service.apis]
}

# ── API SA Permissions ───────────────────────

resource "google_project_iam_member" "api_roles" {
  for_each = toset([
    "roles/cloudsql.client",
    "roles/secretmanager.secretAccessor",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.api.email}"
}
