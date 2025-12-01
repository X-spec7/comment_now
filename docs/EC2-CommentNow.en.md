# CommentNow EC2 Instance Configuration Record

## Basic Information

| Item               | Value                  |
| ------------------ | ---------------------- |
| Project Name       | CommentNow             |
| Instance Name      | commentnow-dev-01      |
| Instance ID        | i-06c328e7748bd5dda    |
| Instance Type      | t3.small               |
| Architecture       | 64-bit (x86_64)        |
| Status             | Active                 |
| Region             | ap-northeast-1 (Tokyo) |
| VPC ID             | vpc-07f1ab60           |
| Subnet ID          | subnet-cd2ec985        |
| IAM Role           | CommentNowEC2SSMRole   |
| IMDS Version       | V2 Only                |
| Auto Scaling Group | None                   |

## Network Configuration

| Item                 | Value                                                            |
| -------------------- | ---------------------------------------------------------------- |
| Public IPv4 Address  | 54.250.252.176                                                   |
| Private IPv4 Address | 172.31.32.112                                                    |
| IPv6 Address         | –                                                                |
| Public DNS           | ec2-54-250-252-176.ap-northeast-1.compute.amazonaws.com          |
| Private DNS Name     | ip-172-31-32-112.ap-northeast-1.compute.internal                 |
| Elastic IP           | Not Assigned                                                     |
| Hostname Type        | ip-172-31-32-112.ap-northeast-1.compute.internal (Auto-assigned) |

## Storage Configuration

| Item                  | Value                    |
| --------------------- | ------------------------ |
| Volume Type           | EBS (Root)               |
| Device Name           | /dev/sda1                |
| Snapshot ID           | snap-0baf7b47d57fc3df0   |
| Size                  | 20 GiB                   |
| Type                  | gp3                      |
| IOPS                  | 3000                     |
| Throughput            | 125 MiB/s                |
| Encryption            | Encrypted (KMS: aws/ebs) |
| Delete on Termination | Yes                      |

## Security Settings

| Item                | Value                   |
| ------------------- | ----------------------- |
| Security Group Name | commentnow-sg           |
| Security Group ID   | sg-04c1478765586bf1a    |
| VPC                 | vpc-07f1ab60            |
| Inbound Rules       |                         |
| → HTTP (80)         | 0.0.0.0/0               |
| → HTTPS (443)       | 0.0.0.0/0               |
| → TCP (3000)        | 0.0.0.0/0               |
| → TCP (8000)        | 0.0.0.0/0               |
| Outbound Rules      | All Allowed (0.0.0.0/0) |
| SSH Port (22)       | Closed                  |

## IAM Role Configuration

| Item                       | Value                        |
| -------------------------- | ---------------------------- |
| Role Name                  | CommentNowEC2SSMRole         |
| Trusted Entity             | EC2                          |
| Attached Policy            | AmazonSSMManagedInstanceCore |
| Optional Additional Policy | -                            |
| Purpose                    | Allow SSM Access             |

## System Settings (Advanced)

| Setting Item                   | Status / Value |
| ------------------------------ | -------------- |
| Instance Auto Recovery         | Enabled        |
| Termination Protection         | Enabled        |
| Stop Protection                | -              |
| CloudWatch Detailed Monitoring | -              |
| Credit Specification (T3)      | -              |
| Tenancy                        | -              |
| EBS Optimization               | -              |
| Nitro Enclave                  | -              |
| CPU Options                    | -              |
| Metadata Access                | -              |
| License Configuration          | -              |

## SSM Access Information

| Item                       | Value                                                |
| -------------------------- | ---------------------------------------------------- |
| Connection Method          | AWS CLI / Console via SSM Session Start              |
| Connection Command Example | `aws ssm start-session --target i-06c328e7748bd5dda` |
| IAM User Example           | arktecher (SSM Access Rights Granted)                |
| CloudWatch Logs Output     | -                                                    |
