// shared/rollup-state-handler

import { ROLLUP_SERVER } from './config';
import { toHex } from 'viem';

export class RollupStateHandler {
    static async advanceWrapper(callback) {
        try {
            const result = await callback();
            const noticeResponse = await fetch(`${ROLLUP_SERVER}/notice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payload: toHex(JSON.stringify(result)),
                }),
            });

            if (noticeResponse.status >= 400) throw new Error(noticeResponse.statusText);

            return 'accept';
        } catch (error) {
            return this.handleReport({ error });
        }
    }

    static async inspectWrapper(callback) {
        try {
            const result = await callback();
            return this.handleReport(result, 'accept');
        } catch (error) {
            return this.handleReport({ error });
        }
    }

    static async handleReport(data, status = 'reject') {
        const reportResponse = await fetch(`${ROLLUP_SERVER}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: toHex(JSON.stringify(data)) }),
        });

        if (reportResponse.status >= 400 && status === 'accept') status = 'reject';

        return status;
    }
}
