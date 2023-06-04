export abstract class Job {
    abstract run(): Promise<void>;
}

export const secPerDay = 24 * 60 * 60;