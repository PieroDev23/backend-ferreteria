import AWS, { S3 } from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";

export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = this.AWSSetup();
  }

  private AWSSetup() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION,
    });

    return new AWS.S3();
  }

  upload(fileBase64: string, filename: string): ManagedUpload {
    const [metadata, base64Data] = fileBase64.split(";base64,").pop()!;

    if (!base64Data || !metadata) {
      throw new Error("El formato del archivo Base64 no es válido.");
    }

    const contentType = metadata.split(":")[1];
    const buffer = Buffer.from(base64Data, "base64");

    return this.s3.upload({
      Bucket: process.env.AWS_BUCKET!,
      Key: filename,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: contentType,
    });
  }
}
