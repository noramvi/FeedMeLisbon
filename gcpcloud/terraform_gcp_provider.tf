provider "google" {
    credentials = file("agisit-2425-website-26-467e512755ca.json")
    project = var.GCP_PROJECT_ID
    zone = var.GCP_ZONE
}
