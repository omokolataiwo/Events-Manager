const initialState = () => {
  const state = {
    allCenters: {
      message: '',
      centers: [],
    },
    centerToGet: {},
    centerToBeModified: [],
    rentalCostAndFacilities: {
      facilities: [],
      rentalCost: '',
    },
    oneCenter: {
      aCenter: {},
      message: '',
    },
    primaryCenterDetails: {
      name: '',
      type: '',
      capacity: '',
      address: '',
      mobileNumber: '',
    },
    errorMessage: '',
    imageUpload: {
      imageUrl: '',
      uploadProgress: 0,
      currentTask: undefined,
    },
    status: {
      modificationPrompted: true,
      fetching: false,
      fetched: false,
      addedCosts: false,
      addedFacilities: false,
      error: false,
      uploadedImage: false,
      uploadingImage: false,
      addedPrimaryCenterDetails: false,
      uploadImagePaused: false,
      uploadImageCancelled: false,
      addingCenter: false,
      changeImagePrompted: false,
      deleteCenterPrompted: false,
      modifying: false,
      getACenterPrompted: false
    }
  };
  if (localStorage.getItem('center-to-get-bulk') !== null) {
    return {
      ...state.state,
      centerToGet: JSON.parse(localStorage.getItem('center-to-get-bulk')).aCenter.id,
      oneCenter: {
        aCenter: JSON.parse(localStorage.getItem('center-to-get-bulk')).aCenter,
      },
      status: {
        getACenterPrompted: true,
      }
    };
  }
  if (localStorage.getItem('centerToBeModified')) {
    return {
      ...state.state,
      allCenters: {
        message: '',
        centers: JSON.parse(localStorage.getItem('allCenters')),
        center: {},
      },
      centerToBeModified: JSON.parse(localStorage.getItem('centerToBeModified')),
      status: {
        ...state.status,
        modificationPrompted: true,
      }
    };
  }
  return state;
};

export default initialState;
