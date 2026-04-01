import { FormType } from '@prisma/client';
export declare class CreateContactFormDto {
    formType?: FormType;
    fullName?: string;
    companyBrandName?: string;
    designationRole?: string;
    emailAddress?: string;
    phone?: string;
    serviceInterested?: string;
    budget?: string;
    projectTimelineExpectedStart?: string;
    messageBrief?: string;
    imageUrl?: string;
    clientId?: string;
    typeOfIssue?: string;
    partnershipType?: string;
    existingClientsOrKeyMarkets?: string;
    websitePortfolio?: string;
}
