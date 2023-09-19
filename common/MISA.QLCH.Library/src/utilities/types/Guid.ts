import Log from "../Log";

export default class Guid{
    /**
     * Create New Guid
     * @returns Guid.NewGuid()
     */
    public static NewGuid() {
        try { 
            return crypto.randomUUID();
        } catch (error) {
            Log.ErrorLog(error as Error);
            return "00000000-0000-0000-0000-000000000000";
        }
    }
}