

export function getSpriteOutputInfo(target)
{
    console.log("\nName: " + target.data.name);
    console.log("X: " + target.data.x);
    console.log("Y: " + target.data.y);
    console.log("Direction: " + target.data.direction);
    console.log("Size: " + target.data.size);
}

/**
 * Gets the costumes of a sprite and the backdrops of a stage
 * @param {} target Stage or Sprite
 */
export function getCostumes(target)
{
    console.log('\n' + target.data.name + ": ");
    target.data.costumes.forEach(costume => 
    {
        console.log(costume.name);
    })
}