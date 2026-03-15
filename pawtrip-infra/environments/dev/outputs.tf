output "project_id" {
  description = "GCP Project ID"
  value       = module.project.project_id
}

output "cloud_sql_connection_name" {
  description = "Cloud SQL connection name"
  value       = module.database.connection_name
}

output "cloud_sql_private_ip" {
  description = "Cloud SQL private IP"
  value       = module.database.private_ip
}

output "artifact_registry_url" {
  description = "Artifact Registry URL"
  value       = module.registry.repository_url
}

output "api_sa_email" {
  description = "API service account email"
  value       = module.iam.api_sa_email
}

output "ci_sa_email" {
  description = "CI/CD service account email"
  value       = module.iam.ci_sa_email
}

output "workload_identity_provider" {
  description = "Workload Identity provider"
  value       = module.iam.workload_identity_provider
}

output "media_bucket_name" {
  description = "Media storage bucket name"
  value       = module.storage.bucket_name
}

output "vpc_connector_id" {
  description = "VPC connector for Cloud Run"
  value       = module.networking.vpc_connector_id
}
