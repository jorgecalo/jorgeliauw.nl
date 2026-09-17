---
title: "Export Google Cloud Compute Engine disk to VMware Disk"
description: "Convert your GCE disk and to run it on a local VMware ESX Server"
pubDate: "2022-06-15T22:40:21+01:00"
heroImage: "/images/spacex-sateliet-overview.webp"
tags: ["Google Cloud"]
---

This post will describe how to export and convert your Google Cloud Compute Engine (GCE) disks to a Vmware Disk (vmdk). Think about if you want run some Cloud workloads in a on-premise environment to lower the costs of your test (DTAP) environment.


<figure class="my-8">
  <img src="/images/gce/Google-ComputeEngine-ExportDisk-to-VMDK-CreateDiskImage1.webp" alt="Export Google Cloud Compute Engine disk to VMware Disk" class="rounded-xl shadow-lg border border-slate-800 mx-auto max-h-[500px] object-cover" loading="lazy" />
</figure>




<figure class="my-8">
  <img src="/images/gce/Google-ComputeEngine-ExportDisk-to-VMDK-CreateDiskImage2.webp" alt="Export Google Cloud Compute Engine disk to VMware Disk" class="rounded-xl shadow-lg border border-slate-800 mx-auto max-h-[500px] object-cover" loading="lazy" />
</figure>




<figure class="my-8">
  <img src="/images/gce/Google-ComputeEngine-ExportDisk-to-VMDK-Succesful-Disk-Export.webp" alt="Export Google Cloud Compute Engine disk to VMware Disk" class="rounded-xl shadow-lg border border-slate-800 mx-auto max-h-[500px] object-cover" loading="lazy" />
</figure>




<figure class="my-8">
  <img src="/images/gce/Google-ComputeEngine-ExportDisk-to-VMDK-GcloudExportDisk-CLI.webp" alt="Export Google Cloud Compute Engine disk to VMware Disk" class="rounded-xl shadow-lg border border-slate-800 mx-auto max-h-[500px] object-cover" loading="lazy" />
</figure>




<figure class="my-8">
  <img src="/images/gce/Google-ComputeEngine-ExportDisk-to-VMDK-DownloadDisk-Bucket.webp" alt="Export Google Cloud Compute Engine disk to VMware Disk" class="rounded-xl shadow-lg border border-slate-800 mx-auto max-h-[500px] object-cover" loading="lazy" />
</figure>




<figure class="my-8">
  <img src="/images/gce/Google-ComputeEngine-ExportDisk-to-VMDK-CreateSubnet-AutoMode.webp" alt="Export Google Cloud Compute Engine disk to VMware Disk" class="rounded-xl shadow-lg border border-slate-800 mx-auto max-h-[500px] object-cover" loading="lazy" />
</figure>


Export Compute Engine Disk and convert to VMware
(vmdk)

0. Create a Cloud Storage bucket
Name: export-gce-disks

```
gsutil URI gs://export-gce-disks
```

gs://export-gce-disks
https://storage.cloud.google.com/export-gce-disks/

1. Storage Disk
Action: Create Image

2. Create an Image
Go to Virtual Machine -> Storage -> Disks -> Click on Action -> Create Image

Name: image-chatsupport-disk-image
Source: disk
Source disk: boot (Disk you want to migrate to convert to image)
Loction: Regional
Encryption: Google-managed encryption key


CLI

```
gcloud compute images create image-chatsupport-disk-image
--project=blastcsc-vms --source-disk=boot --source-disk-zone=europe-west4-b --storage-location=europe-west4
```

3. Export Image to Storage Bucket

Keep in mind that
Destination URI should include filename
project = should be the projectID

Argument: --export-format vmdk

```
gcloud compute images export \
    --destination-uri gs://export-gce-disks/disk-image.tar.gz \
    --image image-chatsupport-disk-image \
    --export-format vmdk \
    --project blastcsc-vms
```

Export failed on: 
 step "export-disk" run error: step "run-export-disk" run error: googleapi: Error 400: Invalid value for field 'resource.networkInterfaces[0]': '{  "network": "projects/blastcsc-vms/global/networks/default",  "accessConfig": [{    "type": "ONE_T...'. Subnetwork should be specified for custom subnetmode network, invalid

Fix: 
Create new VPC network
Select: Subnet creation mode set to Automatic
Assign VPC network Compute Image Instance
Repeat from step 2

 --subnet=default \
 --zone=europe-west4-b \

Attempt 2:
Add subnet + Zone where the subnet is deployed in. Fixes the problem.

```
 gcloud compute images export \
    --destination-uri gs://export-gce-disks/disk-image.tar.gz \
    --image image-chatsupport-disk-image \
    --export-format vmdk \
    --subnet=default \
 	--zone=europe-west4-b \
    --project blastcsc-vms
```

Reference: https://cloud.google.com/compute/docs/images/export-image#exporting_an_image