const logger = require("../config/loggerApi.js");
const mappers = require("../mappers");
const organizationRepository = require("../repository/organizationRepository");
const orgAddressRepository = require("../repository/orgAddressRepository");
const orgContactRepository = require("../repository/orgContactDetailsRepository");
const orgmapservicesInfoRepository = require("../repository/orgServiceMapRepository");
const providersRepository = require("../repository/providerDetailsRepository");
const systemIntegrationRepository = require("../repository/orgIntegrationRepository");
const payerContractsRepository = require("../repository/payerContractDetailRepository");
const complianceConsentRepository = require("../repository/complianceCheckRepository");
const orgSignatureRepository = require("../repository/orgSignatureRepository");

logger.silly("Enter providerService.js");
const providerOnboarding = async (req, decodeValue, res) => {
  try {
    logger.info("Enter in providerService - providerOnboarding");
    const {
      organizationInfo,
      contactDetails,
      servicesRequired,
      providerDetails,
      systemIntegration,
      payerContracts,
      compliance,
      signature,
    } = req.body;
    const orgInfo = await mappers.mapOrganizationDetails(
      organizationInfo,
      decodeValue
    );
    let orgResult = await organizationRepository.createOrganization(orgInfo);
    const orgAddress = await mappers.mapOrganizationAddress(
      organizationInfo,
      decodeValue,
      orgResult.id
    );
    const primaryContactInfo = await mappers.mapContactDetails(
      contactDetails.primary,
      decodeValue,
      orgResult.id,
      "primary"
    );
    const technicalContactInfo = await mappers.mapContactDetails(
      contactDetails.technical,
      decodeValue,
      orgResult.id,
      "technical"
    );
    const orgmapservicesInfo = await mappers.orgmapservicesInfo(
      servicesRequired,
      decodeValue,
      orgResult.id
    );
    const providersInfo = await mappers.mapProviders(
      providerDetails,
      decodeValue,
      orgResult.id
    );
    const systemIntegrationInfo = await mappers.mapSystemIntegration(
      systemIntegration,
      decodeValue,
      orgResult.id
    );
    const payerContractsInfo = await mappers.mapPayerContracts(
      payerContracts,
      decodeValue,
      orgResult.id
    );
    const complianceConsentInfo = await mappers.mapComplianceConsent(
      compliance,
      decodeValue,
      orgResult.id
    );
    const orgSignatureInfo = await mappers.mapOrgSignature(
      signature,
      decodeValue,
      orgResult.id
    );

    await orgAddressRepository.createOrgAddress(orgAddress);
    await orgContactRepository.createOrgContactDetails(primaryContactInfo);
    await orgContactRepository.createOrgContactDetails(technicalContactInfo);
    await orgmapservicesInfoRepository.bulkCreateOrgServiceMap(orgmapservicesInfo);
    await providersRepository.bulkCreateProviderDetails(providersInfo);
    await systemIntegrationRepository.createOrgIntegration(systemIntegrationInfo);
    await payerContractsRepository.createPayerContractDetail(payerContractsInfo);
    await complianceConsentRepository.createComplianceCheck(complianceConsentInfo);
    await orgSignatureRepository.createOrgSignature(orgSignatureInfo);

    return  orgResult;

  } catch (error) {
    console.log(error);
    logger.error(
      "Error occured in providerService - providerOnboarding",
      error
    );
  }
};

logger.silly("Exit providerService.js");

module.exports = {
  providerOnboarding,
};
