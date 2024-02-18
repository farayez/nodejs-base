/**
 * Endpoint to test error exeption
 */
export default async function getError(req, res) {
    throw new Error('test error');
}
