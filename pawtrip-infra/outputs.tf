# ──────────────────────────────────────────────
# PawTrip GCP — Outputs
# ──────────────────────────────────────────────

output "api_url" {
  description = "Cloud Run API URL"
  value       = google_cloud_run_v2_service.api.uri
}

output "db_private_ip" {
  description = "Cloud SQL private IP address"
  value       = google_sql_database_instance.postgres.private_ip_address
}

output "db_connection_name" {
  description = "Cloud SQL connection name (for Cloud SQL Proxy)"
  value       = google_sql_database_instance.postgres.connection_name
}

output "media_bucket" {
  description = "Cloud Storage bucket for media uploads"
  value       = google_storage_bucket.media.name
}

output "media_bucket_url" {
  description = "Public URL prefix for media files"
  value       = "https://storage.googleapis.com/${google_storage_bucket.media.name}"
}

output "api_service_account" {
  description = "API service account email"
  value       = google_service_account.api.email
}

output "vpc_name" {
  description = "VPC network name"
  value       = google_compute_network.vpc.name
}
