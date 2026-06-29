# main.tf is just a convention, not a requirement. 
# Terraform merges all .tf files in the directory into a single 
# configuration before planning and applying.

# EC2 Instance
resource "aws_instance" "web_server" {

  ami           = "ami-0ec10929233384c7f"
  instance_type = var.instance_type
  security_groups = ["default"]
  
  root_block_device {
    volume_size           = 8
    volume_type           = "gp3"
    delete_on_termination = true
    encrypted             = true
  }
  tags = {
    Name = "StaticWebsiteServer"
  }
}

resource "aws_security_group" "web_sg" {
  name = "web-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "tls_private_key" "ec2_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}


