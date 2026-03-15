output "project_id" {
  description = "The GCP project ID"
  value       = google_project.pawtrip.project_id
}

output "project_number" {
  description = "The GCP project number"
  value       = google_project.pawtrip.number
}

output "api_services" {
  description = "Map of enabled API services"
  value       = google_project_service.apis
}
