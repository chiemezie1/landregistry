import { Land } from '../model/land';
import { RollupStateHandler } from '../shared/rollup-state-handler';
import { landStorage } from '../storage/land';

export class LandController {
    async createLand(data) {
        return await RollupStateHandler.advanceWrapper(() => {
            const newLand = new Land(data);
            landStorage.addLand(newLand);

            return {
                ok: true,
                message: `Land created successfully!`,
                data: newLand.getData(),
            };
        });
    }

    async saleLand(data) {
        const { id, newOwner } = data;
        const land = landStorage.getLandById(id);

        if (!land) {
            return await RollupStateHandler.handleReport({ error: `Land not found for ID '${id}'` });
        }

        land.owner = newOwner;
        land.onSale = false;
        land.price = 0;
        landStorage.updateLand(land);

        return await RollupStateHandler.advanceWrapper(() => ({
            status: 'Land ownership updated off-chain',
            data: { id, newOwner },
        }));
    }

    async putLandOnSale(data) {
        if (!data.landId || !data.price) {
            return await RollupStateHandler.handleReport({ error: 'Land ID and price must be provided.' });
        }

        const land = landStorage.getLandById(data.landId);
        if (!land) {
            return await RollupStateHandler.handleReport({ error: `Land not found for ID '${data.landId}'` });
        }

        land.onSale = true;
        land.price = data.price;
        landStorage.updateLand(land);

        return await RollupStateHandler.advanceWrapper(() => ({
            status: 'Land is now on sale',
            data: { landId: data.landId, price: data.price },
        }));
    }

    async removeLandFromSale(data) {
        if (!data.landId) {
            return await RollupStateHandler.handleReport({ error: 'Land ID must be provided.' });
        }

        const land = landStorage.getLandById(data.landId);
        if (!land) {
            return await RollupStateHandler.handleReport({ error: `Land not found for ID '${data.landId}'` });
        }

        land.onSale = false;
        land.price = 0;
        landStorage.updateLand(land);

        return await RollupStateHandler.advanceWrapper(() => ({
            status: 'Land sale removed',
            data: { landId: data.landId },
        }));
    }

    async updateLandDetails(data) {
        if (!data.landId || !data.newDetails) {
            return await RollupStateHandler.handleReport({ error: 'Land ID and new details must be provided.' });
        }

        const land = landStorage.getLandById(data.landId);
        if (!land) {
            return await RollupStateHandler.handleReport({ error: `Land not found for ID '${data.landId}'` });
        }

        land.details = data.newDetails;
        landStorage.updateLand(land);

        return await RollupStateHandler.advanceWrapper(() => ({
            status: 'Land details updated',
            data: { landId: data.landId, newDetails: data.newDetails },
        }));
    }

    async getLandDetails(data) {
        if (!data.landId) {
            return await RollupStateHandler.handleReport({ error: 'Land ID must be provided.' });
        }

        const land = landStorage.getLandById(data.landId);
        if (!land) {
            return await RollupStateHandler.handleReport({ error: `Land not found for ID '${data.landId}'` });
        }

        return await RollupStateHandler.inspectWrapper(() => ({
            data: land.getData(),
        }));
    }

    async getAllLand() {
        return await RollupStateHandler.inspectWrapper(() => 
            landStorage.getAllLands()
        );
    }
}
