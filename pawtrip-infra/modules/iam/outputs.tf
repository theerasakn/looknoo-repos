output "api_sa_email" {
  description = "API service account email"
  value       = google_service_account.api.email
}

output "ci_sa_email" {
  description = "CI/CD service account email"
  value       = google_service_account.ci.email
}

output "workload_identity_provider" {
  description = "Workload Identity provider resource name"
  value       = google_iam_workload_identity_pool_provider.github.name
}
