export class GlobalVariables {
    public static loadingPage: boolean = true;

    public static getLoadingStatus(): boolean {
        return this.loadingPage;
    }

    public static setLoadingStatus(state: boolean ) {
        this.loadingPage = state;
    }
}