import React from "react";
import { getRandomInt } from "../../utils/utils";
import {
    DISCO_BALL_SVG,
    SVGS,
    WHISKEY_BOTTLE_SVG,
} from "../../utils/constants";

function FoodItem({ disco, alcohol }) {
    const randomFoodItem = React.useMemo(() => {
        if (disco) {
            return DISCO_BALL_SVG;
        } else if (alcohol) {
            return WHISKEY_BOTTLE_SVG;
        } else {
            return SVGS[getRandomInt(0, SVGS.length - 1)];
        }
    }, [disco, alcohol]);

    return randomFoodItem;
}

export default FoodItem;
