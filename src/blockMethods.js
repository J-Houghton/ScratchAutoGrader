// #region Motion Blocks

/**
 * Simulates a move block in scratch
 * @param {Target} sprite The sprite being moved
 * @param {int} steps The amount of steps
 */
export function moveBlock(sprite, steps)
{
    let degree = sprite.data.direction;
    if (degree < 0) { degree = 360 + degree; }

    let radDegree = toRadians(degree);

    sprite.data.x += Math.round(Math.sin(radDegree) * steps);
    sprite.data.y += Math.round(Math.cos(radDegree) * steps);
}

/**
 * Simulates a turn block (right)
 * @param {Target} sprite The sprite being rotated 
 * @param {*} amount The amount of rotation
 */
export function turnRightBlock(sprite, amount)
{
    let direction = sprite.data.direction;

    // Makes sure the angle isn't negative
    if (direction < 0) { direction += 360; }

    // Deals with if the user inputs multiple 360 degree rotations
    if (amount > 360) 
    { 
        let completeRotations = parseInt(amount / 360);
        amount -= 360 * completeRotations; 
    }

    // Adds the rotation amount
    direction += amount;

    // Makes sure the angle is within (-180 to 180)
    if (direction > 180) { direction -= 360; }
    if (direction <= -180) { direction += 360;}

    sprite.data.direction = direction;
}

/**
 * Simulates a turn block (left)
 * @param {Target} sprite The sprite being rotated
 * @param {int} amount The amount of rotation
 */
export function turnLeftBlock(sprite, amount)
{
    let direction = sprite.data.direction;

    // Makes sure the angles aren't negative
    if (direction < 0) { direction += 360; }

    // Deals with if the user inputs multiple 360 degree rotations
    if (amount > 360) 
    { 
        let completeRotations = parseInt(amount / 360);
        amount -= 360 * completeRotations; 
    }

    // Subtracts the rotation amount
    direction -= amount;

    // Makes sure the angle is within (-180 to 180)
    if (direction > 180) { direction -= 360; }
    if (direction <= -180) { direction += 360;}

    sprite.data.direction = direction;
}

/**
 * Simulates a go to block - moves a sprite to the specified location
 * @param {Target} sprite The sprite being moved
 * @param {int} x The desired x location
 * @param {int} y the desired y location
 */
export function goToBlock(sprite, x, y)
{
    sprite.data.x = x;
    sprite.data.y = y;
}

/**
 * Simulates a glide to block - moves a sprite to a location over time
 * @param {Target} sprite The sprite being moved 
 * @param {int} seconds The amount of seconds it will take
 * @param {int} x The desired x location
 * @param {int} y The desired y location
 * @returns 
 */
export function glideToBlock(sprite, seconds, x, y)
{
    // FINISH
    return goToBlock(sprite, x, y);
}

/**
 * Changes the direction of a sprite to the desired value
 * @param {Target} sprite The sprite's which direction we are changing
 * @param {int} direction The desired direction
 */
export function pointInDirectionBlock(sprite, direction)
{
    sprite.data.direction = direction;
}

/**
 * Increments the X value by the specified amount
 * @param {Target} sprite The sprite being moved
 * @param {int} amount The amount of movement
 */
export function changeXByBlock(sprite, amount)
{
    sprite.data.x += amount;
}

/**
 * Increments the Y value by the specified amount
 * @param {Target} sprite The sprite being moved
 * @param {*} amount The amount of movement
 */
export function changeYByBlock(sprite, amount)
{
    sprite.data.y += amount;
}

/**
 * Moves a sprite's X location
 * @param {Target} sprite The sprite being moved
 * @param {int} X The desired x location
 */
export function setXToBlock(sprite, x)
{
    sprite.data.x = x;
}

/**
 * Moves a sprite's Y location
 * @param {Target} sprite The sprite being moved
 * @param {int} y The desired Y location
 */
export function setYToBlock(sprite, y)
{
    sprite.data.y = y;
}

/**
 * Gets the X position of the sprite
 * @param {Target} sprite 
 * @returns The X position of the sprite
 */
export function xPositionBlock(sprite)
{
    return sprite.data.x;
}

/**
 * Gets the Y position of the sprite
 * @param {Target} sprite The target sprite
 * @returns The Y position of the sprite
 */
export function yPositionBlock(sprite)
{
    return sprite.data.y;
}

/**
 * This function gets the direction a sprite is facing
 * @param {Target} sprite The target sprite
 * @returns The direction of the sprite
 */
export function directionBlock(sprite)
{
    return sprite.data.direction;
}

// #endregion

// #region Looks blocks - May need to update to change output

export function saySecondsBlock(sprite, phrase, seconds)
{
    console.log(sprite.data.name + " says '" + phrase + "' for " + seconds + " seconds");
}

export function sayBlock(sprite, phrase)
{
    console.log(sprite.data.name + " says '" + phrase + "'");
}

export function thinksSecondsBlock(sprite, phrase, seconds)
{
    console.log(sprite.data.name + " thinks '" + phrase + "' for " + seconds + " seconds");
}

export function thinksBlock(sprite, phrase)
{
    console.log(sprite.data.name + " thinks '" + phrase + "'");
}

export function switchCostumeBlock(sprite, costume)
{
    // WIP
    if (sprite.data.costumes.includes(costume)) {
        sprite.data.currentCostume = costume;
    } 
}

export function changeSizeByBlock(sprite, increment)
{
    sprite.data.size += increment;
}

export function setSizeToBlock(sprite, size)
{
    sprite.data.size = size;
}



/**
 * Returns an angle in radians
 * @param {float} angle An angle in degrees
 * @returns The angle in radians
 */
function toRadians (angle) 
{
    return angle * (Math.PI / 180);
}

