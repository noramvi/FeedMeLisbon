resource "google_compute_firewall" "frontend_rules" {
  name    = "frontend"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["80", "443", "32000", "30007", "8080"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["worker"]
}


resource "google_compute_firewall" "k8s_internal" {
  name    = "allow-internal-traffic"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["0-65535"]
  }

  allow {
    protocol = "udp"
    ports = ["0-65535"]
  }

  allow {
    protocol = "icmp"
  }

  source_ranges = ["10.164.0.0/20"]

}

resource "google_compute_firewall" "calico" {
  name    = "calico-ip"
  network = "default"

  allow {
    protocol = "4"
  }
  source_ranges = ["10.164.0.0/20"]
}