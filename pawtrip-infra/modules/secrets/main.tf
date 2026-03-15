# ──────────────────────────────────────────────
# Module: secrets — Secret Manager
# ──────────────────────────────────────────────

locals {
  secrets = {
    "jwt-secret"              = var.jwt_secret
    "db-password"             = var.db_password
    "google-maps-api-key"     = var.google_maps_api_key
    "google-oauth-client-id"  = var.google_oauth_client_id
    "google-oauth-secret"     = var.google_oauth_client_secret
  }
}

resource "google_secret_manager_secret" "secrets" {
  for_each  = local.secrets
  project   = var.project_id
  secret_id = "pawtrip-${each.key}-${var.environment}"

  replication {
    auto {}
  }

  labels = {
    app         = "pawtrip"
    environment = var.environment
  }
}

resource "google_secret_manager_secret_version" "versions" {
  for_each    = local.secrets
  secret      = google_secret_manager_secret.secrets[each.key].id
  secret_data = each.value
}
