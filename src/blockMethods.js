export function moveBlock(sprite, steps)
{
    let degree = sprite.data.direction

    if (degree < 0) { degree = 360 - degree; }
    console.log(Math.sin(degree));
    // sprite.data.x = Math.cos(degree) * steps;
    // sprite.data.y = Math.sin(degree) * steps;
}