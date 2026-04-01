-- CreateTable
CREATE TABLE `ContactForm` (
    `id` VARCHAR(191) NOT NULL,
    `formType` ENUM('WORK_ENQUIRY', 'CUSTOMER_SUPPORT', 'PARTNERSHIP') NULL,
    `fullName` VARCHAR(191) NULL,
    `companyBrandName` VARCHAR(191) NULL,
    `designationRole` VARCHAR(191) NULL,
    `emailAddress` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `serviceInterested` VARCHAR(191) NULL,
    `budget` VARCHAR(191) NULL,
    `projectTimelineExpectedStart` VARCHAR(191) NULL,
    `messageBrief` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `clientId` VARCHAR(191) NULL,
    `typeOfIssue` VARCHAR(191) NULL,
    `partnershipType` VARCHAR(191) NULL,
    `existingClientsOrKeyMarkets` VARCHAR(191) NULL,
    `websitePortfolio` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
