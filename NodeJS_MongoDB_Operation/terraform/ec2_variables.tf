# main.tf is just a convention, not a requirement. 
# Terraform merges all .tf files in the directory into a single 
# configuration before planning and applying.

# EC2 Instance
resource "aws_instance" "web_server" {

  ami           = "ami-0ec10929233384c7f"
  instance_type = var.instance_type
  key_name = aws_key_pair.ec2_key.key_name

  vpc_security_group_ids = [
    aws_security_group.web_sg.id
  ]

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
  name_prefix = "web-sg-"

  description = "Security group for NodeJS application"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "web-sg"
  }
}

resource "aws_key_pair" "ec2_key" {
  key_name   = "terraform-key"
  public_key = tls_private_key.ec2_key.public_key_openssh
}
resource "random_id" "suffix" {
  byte_length = 4
}