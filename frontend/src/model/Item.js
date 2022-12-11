import { stringToHash } from "../utils/utils";

export const itemStates = {
    todo: "TODO",
    done: "DONE"
};

export class Item {
    constructor(text, state, key) {
        this.text = text;
        this.state = state;
        this.key = key;//stringToHash(this.text); // estava id
    }
}