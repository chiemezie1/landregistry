import { RollupStateHandler } from '../shared/rollup-state-handler';
import { encodeFunctionData } from 'viem';
import landRegistryAbi from '../../contracts/LandRegistry.json';
import { Land } from '../model/land';
import { landStorage } from '../storage/land';
import crypto from 'node:crypto';

const LAND_REGISTRY_CONTRACT_ADDRESS = '0xYourContractAddress';

export class LandController {
    async createLand(data, sender) {
        const landId = crypto.randomUUID();
        const newLand = new Land({ id: landId, location: data.location, price: data.price, details: data.details });
        landStorage.addLand(newLand);

        const callData = encodeFunctionData({
            abi: landRegistryAbi,
            functionName: 'registerLand',
            args: [landId, data.location],
        });

        await RollupStateHandler.createVoucher({
            destination: LAND_REGISTRY_CONTRACT_ADDRESS,
            payload: callData,
        });

        return RollupStateHandler.advanceWrapper(() => ({
            status: 'Land registered off-chain and voucher created',
            data: newLand.getData(),
        }));
    }

    async saleLand(data, sender) {
        const { id, newOwner } = data;
        const land = landStorage.getLandById(id);
        if (!land) return RollupStateHandler.handleReport({ error: `Land not found for ID '${id}'` });
        if (land.owner !== sender) return RollupStateHandler.handleReport({ error: 'Only the current owner can sell the land' });

        const callData = encodeFunctionData({
            abi: landRegistryAbi,
            functionName: 'transferLand',
            args: [id, newOwner],
        });

        await RollupStateHandler.createVoucher({
            destination: LAND_REGISTRY_CONTRACT_ADDRESS,
            payload: callData,
        });

        land.owner = newOwner;
        land.onSale = false;
        land.price = 0;
        landStorage.updateLand(land);

        return RollupStateHandler.advanceWrapper(() => ({
            status: 'Land ownership updated off-chain and voucher created',
            data: { id, newOwner },
        }));
    }

    async putLandOnSale(data, sender) {
        if (!data.landId || !data.price) return RollupStateHandler.handleReport({ error: 'Land ID and price must be provided.' });
        const land = landStorage.getLandById(data.landId);
        if (!land) return RollupStateHandler.handleReport({ error: `Land not found for ID '${data.landId}'` });

        land.onSale = true;
        land.price = data.price;
        landStorage.updateLand(land);

        return RollupStateHandler.advanceWrapper(() => ({
            status: 'Land is now on sale',
            data: { landId: data.landId, price: data.price },
        }));
    }

    async removeLandFromSale(data, sender) {
        if (!data.landId) return RollupStateHandler.handleReport({ error: 'Land ID must be provided.' });
        const land = landStorage.getLandById(data.landId);
        if (!land) return RollupStateHandler.handleReport({ error: `Land not found for ID '${data.landId}'` });

        land.onSale = false;
        land.price = 0;
        landStorage.updateLand(land);

        return RollupStateHandler.advanceWrapper(() => ({
            status: 'Land sale removed',
            data: { landId: data.landId },
        }));
    }

    async updateLandDetails(data, sender) {
        if (!data.landId || !data.newDetails) return RollupStateHandler.handleReport({ error: 'Land ID and new details must be provided.' });
        const land = landStorage.getLandById(data.landId);
        if (!land) return RollupStateHandler.handleReport({ error: `Land not found for ID '${data.landId}'` });

        land.details = data.newDetails;
        landStorage.updateLand(land);

        return RollupStateHandler.advanceWrapper(() => ({
            status: 'Land details updated',
            data: { landId: data.landId, newDetails: data.newDetails },
        }));
    }

    async getLandDetails(data) {
        if (!data.landId) return RollupStateHandler.handleReport({ error: 'Land ID must be provided.' });
        const land = landStorage.getLandById(data.landId);
        if (!land) return RollupStateHandler.handleReport({ error: `Land not found for ID '${data.landId}'` });

        return RollupStateHandler.inspectWrapper(() => ({
            data: land.getData(),
        }));
    }

    async getAllLand() {
        return RollupStateHandler.inspectWrapper(() => ({
            data: landStorage.getAllLands().map(land => land.getData()),
        }));
    }
}
