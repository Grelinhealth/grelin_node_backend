const logger = require("./config/loggerApi.js");
const { db } = require("./models");

const serviceModel = db.serviceDetailsModel;

const mapOrganizationDetails = (orgDetails, decoded) => {
  try {
    return {
      org_name: orgDetails.facilityName,
      facility_name: orgDetails.facilityName,
      facility_type: orgDetails.facilityType,
      tax_id_ein: orgDetails.taxId,
      npi_number: orgDetails.npiNumber,
      license_number: orgDetails.licenseNumber,
      license_state: orgDetails.licenseState,
      phone_number: orgDetails.phoneNumber,
      fax_number: orgDetails.faxNumber,
      website_url: orgDetails.websiteUrl,
      is_active: true,
      created_by: decoded.username,
      modified_by: decoded.username,
    };
  } catch (error) {
    logger.error("Error occured in mappers - mapOrganizationDetails", error);
  }
};

const mapOrganizationAddress = (orgDetails, decoded, orgId) => {
  try {
    return {
      org_id: orgId,
      street_address: orgDetails.streetAddress,
      city: orgDetails.city,
      state: orgDetails.state,
      zip_code: orgDetails.zipCode,
      is_active: true,
      created_by: decoded.username,
      modified_by: decoded.username,
    };
  } catch (error) {
    logger.error("Error occured in mappers - mapOrganizationAddress", error);
  }
};

const mapContactDetails = (primaryContact, decoded, orgId, type) => {
  try {
    return {
      org_id: orgId,
      type: primaryContact.preferredContact ? "primary" : "technical",
      full_name: primaryContact.fullName,
      title: primaryContact.title,
      phone_number: primaryContact.phoneNumber,
      email: primaryContact.email,
      preferred_method: primaryContact.preferredContact || null,
      is_active: true,
      created_by: decoded.username,
      modified_by: decoded.username,
    };
  } catch (error) {
    logger.error("Error occured in mappers - mapContactDetails", error);
  }
};

const orgmapservicesInfo = async (servicesRequired, decoded, orgId) => {
  try {
    // Step 1: Extract only the active service keys


    // Step 2: Query matching services from DB
    const matchedServices = await serviceModel.findAll({
      where: {
        name: servicesRequired, // assuming service_name is a valid DB column
      },
    });

    // Step 3: Map and simulate async task (or perform one)
    const mappedRecords = await Promise.all(
      matchedServices.map(async (service) => {
        const newRecord = {
          org_id: orgId,
          service_id: service.id,
          is_active: true,
          created_by: decoded.username,
          modified_by: decoded.username,
        };

        // Simulate async operation — can be replaced with real async call
        await Promise.resolve();

        return newRecord;
      })
    );

    // Step 4: Return the results
    return mappedRecords;
  } catch (error) {
    logger.error("Error occurred in mappers - orgmapservicesInfo", error);
    throw error; // rethrow for the caller to handle
  }
};


const mapProviders = async (providers, decoded, orgId) => {
  try {
    const Records = await Promise.all(
      providers.map(async (provider) => {
        const providerObj = {
          org_id: orgId,
          full_name: provider.fullName,
          specialty: provider.specialty,
          npi_number: provider.npiNumber,
          license_number: provider.stateLicenseNumber,
          board_certifications: provider.boardCertifications,
          affiliated_facility: provider.affiliatedFacility || null,
          is_active: true,
          created_by: decoded.username,
          modified_by: decoded.username,
        };
        // Optional: simulate async work
        await Promise.resolve(); // or call another async function here
        return providerObj;
      })
    );
    return Records;
  } catch (error) {
    logger.error("Error occured in mappers -mapProviders ", error);
  }
};

const mapSystemIntegration = (systemIntegration, decoded, orgId) => {
  try {
    return {
      org_id: orgId,
      ehr_system: systemIntegration.ehrSystem,
      practice_management_software: systemIntegration.practiceManagement,
      preferred_integration_method: systemIntegration.integrationMethod,
      is_active: true,
      created_by: decoded.username,
      modified_by: decoded.username,
    };
  } catch (error) {
    logger.error("Error occured in mappers - mapSystemIntegration", error);
  }
};

const mapPayerContracts = (payerContracts, decoded, orgId) => {
  try {
    return {
      org_id: orgId,
      major_payer_name: JSON.stringify(payerContracts.majorPayers),
      top_five_payer: JSON.stringify(payerContracts.topPayers),
      has_capitated_arrangements: payerContracts.hasRiskArrangements,
      is_active: true,
      created_by: decoded.username,
      modified_by: decoded.username,
    };
  } catch (error) {
    logger.error("Error occured in mappers - mapPayerContracts", error);
  }
};

const mapComplianceConsent = (complianceConsent, decoded, orgId) => {
  try {
    return {
      org_id: orgId,
      hipaa_confirmed: complianceConsent.hipaaCompliance,
      data_access_authorized: complianceConsent.dataAccess,
      terms_accepted: complianceConsent.termsAcceptance,
      is_active: true,
      created_by: decoded.username,
      modified_by: decoded.username,
    };
  } catch (error) {
    logger.error("Error occured in mappers - mapComplianceConsent", error);
  }
};

const mapOrgSignature = (authorizedSignature, decodeValue, orgId) => {
  try {
    const base64Data = authorizedSignature.signature.split(',')[1];  // Remove prefix
    const binaryData = Buffer.from(base64Data, 'base64');
    return {
      org_id: orgId,
      signed_by: authorizedSignature.signatureName,
      signature_date: authorizedSignature.signatureDate,
      signature_url: binaryData,
      is_active: true,
      created_by: decodeValue.username,
      modified_by: decodeValue.username,
    };
  } catch (error) {
    logger.error("Error occured in mappers - mapOrgSignature", error);
  }
};

module.exports = {
  mapOrganizationDetails,
  mapOrganizationAddress,
  mapContactDetails,
  orgmapservicesInfo,
  mapProviders,
  mapSystemIntegration,
  mapPayerContracts,
  mapComplianceConsent,
  mapOrgSignature,
};
