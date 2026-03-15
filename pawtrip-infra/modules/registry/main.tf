# ──────────────────────────────────────────────
# Module: registry — Artifact Registry for Docker images
# ──────────────────────────────────────────────

resource "google_artifact_registry_repository" "pawtrip" {
  project       = var.project_id
  location      = var.region
  repository_id = "pawtrip-${var.environment}"
  description   = "PawTrip Docker images (${var.environment})"
  format        = "DOCKER"

  cleanup_policies {
    id     = "keep-recent"
    action = "KEEP"

    most_recent_versions {
      keep_count = var.environment == "prod" ? 20 : 10
    }
  }
}
