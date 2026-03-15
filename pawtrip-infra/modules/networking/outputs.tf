output "vpc_id" {
  description = "VPC network ID"
  value       = google_compute_network.vpc.id
}

output "vpc_name" {
  description = "VPC network name"
  value       = google_compute_network.vpc.name
}

output "subnet_id" {
  description = "Primary subnet ID"
  value       = google_compute_subnetwork.primary.id
}

output "private_vpc_connection" {
  description = "Private VPC connection for Cloud SQL"
  value       = google_service_networking_connection.private_vpc
}

output "vpc_connector_id" {
  description = "Serverless VPC connector ID"
  value       = google_vpc_access_connector.serverless.id
}
