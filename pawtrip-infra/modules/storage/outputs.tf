output "bucket_name" {
  description = "Media bucket name"
  value       = google_storage_bucket.media.name
}

output "bucket_url" {
  description = "Media bucket URL"
  value       = google_storage_bucket.media.url
}
