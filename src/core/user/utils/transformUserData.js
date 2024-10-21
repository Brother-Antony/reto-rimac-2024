export const transformUserData = (response) => {
    const { config, headers, request, status, data } = response
  
    const transformedData = {
        config,
        headers,
        request,
        status,
        data: {
          ...data,
          documentType: "DNI",
          documentNumber: "30216147",
          phoneNumber: "5130216147",
        },
    }
  
    return transformedData
}
