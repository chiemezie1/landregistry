import { LandController } from './land';

const landController = new LandController();

export const controller = {
    createLand: landController.createLand,
    saleLand: landController.saleLand,
    putLandOnSale: landController.putLandOnSale,
    removeLandFromSale: landController.removeLandFromSale,
    updateLandDetails: landController.updateLandDetails,
    getLandDetails: landController.getLandDetails,
    getAllLand: landController.getAllLand,
};
