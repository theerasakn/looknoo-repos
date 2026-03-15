# ──────────────────────────────────────────────
# PawTrip GCP — Cloud Storage (Media)
# ──────────────────────────────────────────────

resource "google_storage_bucket" "media" {
  name     = "${var.project_id}-${local.prefix}-media"
  location = var.region

  uniform_bucket_level_access = true
  force_destroy               = var.environment != "prod"

  versioning {
    enabled = var.environment == "prod"
  }

  # ── Auto-delete old uploads in dev ─────────

  dynamic "lifecycle_rule" {
    for_each = var.environment == "dev" ? [1] : []
    content {
      action {
        type = "Delete"
      }
      condition {
        age = 90
      }
    }
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST"]
    response_header = ["Content-Type", "Content-Length"]
    max_age_seconds = 3600
  }

  depends_on = [google_project_service.apis]
}

# ── Public read for media files ──────────────

resource "google_storage_bucket_iam_member" "public_read" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# ── API service account can write ────────────

resource "google_storage_bucket_iam_member" "api_write" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.api.email}"
}
