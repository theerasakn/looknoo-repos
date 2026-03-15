# ──────────────────────────────────────────────
# Module: storage — GCS bucket for media uploads
# ──────────────────────────────────────────────

resource "google_storage_bucket" "media" {
  name          = "pawtrip-media-${var.environment}-${var.project_id}"
  project       = var.project_id
  location      = var.region
  storage_class = var.environment == "prod" ? "STANDARD" : "STANDARD"
  force_destroy = var.environment != "prod"

  uniform_bucket_level_access = true

  versioning {
    enabled = var.environment == "prod"
  }

  lifecycle_rule {
    condition {
      age = var.environment == "prod" ? 365 : 90
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE"
    }
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST"]
    response_header = ["Content-Type", "Content-Length"]
    max_age_seconds = 3600
  }
}

# Public read access for media files
resource "google_storage_bucket_iam_member" "public_read" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}
