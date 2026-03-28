# UniEvent - AWS Cloud-Based University Event Management System

## 📌 Overview
UniEvent is a scalable, fault-tolerant university event management system deployed on AWS. Students can browse university events fetched automatically from the Ticketmaster Open API. The system is architected using AWS best practices including VPC isolation, load balancing, and S3 storage.

---

## 🌐 Live URL
> Access via Load Balancer DNS: (to be added)

---

## ⚙️ Technologies Used
- **AWS EC2** – Hosts the Node.js web application
- **AWS VPC** – Network isolation with public and private subnets
- **AWS S3** – Stores event images and media securely
- **AWS IAM** – Manages access control and permissions
- **Elastic Load Balancer (ALB)** – Distributes traffic across EC2 instances
- **AWS NAT Gateway** – Allows private EC2 instances to access the internet
- **Node.js + Express** – Backend web application
- **Ticketmaster Open API** – Source of university event data

---

## 🏗️ AWS Architecture
```
Internet
    |
[Application Load Balancer]  ← Public Subnets
    |           |
[EC2 Instance 1] [EC2 Instance 2]  ← Private Subnets
    |
[NAT Gateway] → Internet (for API calls)
    |
[S3 Bucket] ← Event images stored here
```

### Components
| Component | Details |
|---|---|
| VPC | CIDR: 10.0.0.0/16 |
| Public Subnets | 2 subnets (for ALB + NAT Gateway) |
| Private Subnets | 2 subnets (for EC2 instances) |
| EC2 Instances | 2x Amazon Linux 2023, t2.micro |
| Load Balancer | Application Load Balancer (internet-facing) |
| S3 Bucket | Private bucket for event images |
| IAM Role | EC2 role with S3 access |
| NAT Gateway | Allows outbound internet from private subnets |

---

## 🔄 Data Flow
1. User sends request → hits **Load Balancer**
2. Load Balancer routes to one of the **EC2 instances**
3. EC2 app calls **Ticketmaster API** to fetch events
4. Event images are stored/retrieved from **S3**
5. Events displayed to user as "University Events"

---

## 🔐 Security Design
- EC2 instances placed in **private subnets** (no direct public access)
- **IAM roles** control EC2 access to S3 (no hardcoded credentials)
- S3 bucket is **private** (no public access)
- Load Balancer is the **only public entry point**
- `.env` file used locally for API keys (never committed to GitHub)

---

## ⚡ Fault Tolerance & Scalability
- **2 EC2 instances** running simultaneously
- If one instance fails, Load Balancer **automatically reroutes** traffic to the healthy instance
- ALB performs **health checks** on both instances
- Architecture supports adding more EC2 instances as needed

---

## 📡 API Used
**Ticketmaster Discovery API**
- URL: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
- Provides: Event title, date, venue, description, images
- Authentication: API key (stored in `.env`)

---

## 🚀 Deployment Steps

### 1. VPC Setup
- Created VPC with CIDR `10.0.0.0/16`
- Created 2 public subnets and 2 private subnets
- Attached Internet Gateway to public subnets
- Created NAT Gateway in public subnet for private EC2 outbound access

### 2. EC2 Instances
- Launched 2 EC2 instances in private subnets
- Installed Node.js and Git
- Cloned this repository
- Configured `.env` with API key
- Started application on port 3000

### 3. Load Balancer
- Created Application Load Balancer in public subnets
- Created Target Group on port 3000
- Registered both EC2 instances
- Enabled health checks on `/`

### 4. S3 Bucket
- Created private S3 bucket `unievent-images`
- Disabled public access
- Configured bucket policy for EC2 IAM role access only

### 5. IAM Role
- Created EC2 IAM role
- Attached `AmazonS3FullAccess` policy
- Attached role to both EC2 instances

---

## 💻 How to Run Locally
```bash
git clone https://github.com/Malik-Ahmed-Abdullah/Assignment1_AWS_CE.git
cd Assignment1_AWS_CE/app
npm install
```

Create `.env` file:
```
TICKETMASTER_API_KEY=your_api_key_here
```

Run:
```bash
node app.js
```

Visit: `http://localhost:3000`

---

## 📁 Repository Structure
```
Assignment1_AWS_CE/
│── README.md
│── app/
│   ├── app.js
│   ├── package.json
│   └── .env.example
```

---
Cloud Architecture Assignment – AWS Deployment
