export async function getAgg(accordions, accordionLists, type) {
  let selectedAgg;
  let selectedValue;

  for (let i = 0; i < (await accordions.count()); i++) {
    const listItem = accordionLists.nth(i);

    if ((await listItem.locator(".item").count()) > 0) {
      const agg = await listItem
        .locator(".item:first-child .ui.large.label")
        .nth(0)
        .innerText();
      if (
        (type === "number" && !isNaN(parseFloat(agg))) ||
        (typeof agg == type && agg !== "true" && agg !== "false") ||
        (type === "boolean" && (agg === "true" || agg === "false"))
      ) {
        selectedAgg = accordions.nth(i);
        selectedValue = agg;
        break;
      }
    }
  }
  return { selectedAgg, selectedValue };
}

export async function getClickLocation(dropdownLocator) {
  const dropdownBox = await dropdownLocator.boundingBox();
  if (!dropdownBox) {
    throw new Error("Dropdown not found");
  }

  const labels = await dropdownLocator.locator(".label").elementHandles();
  const icons = await dropdownLocator.locator(".icon").elementHandles();

  const isPointInsideBox = (point, box) => {
    return (
      point.x >= box.x &&
      point.x <= box.x + box.width &&
      point.y >= box.y &&
      point.y <= box.y + box.height
    );
  };

  const findNonCollidingPoint = async () => {
    for (let i = 0; i < 10; i++) {
      const point = {
        x: dropdownBox.x + Math.random() * dropdownBox.width,
        y: dropdownBox.y + Math.random() * dropdownBox.height,
      };

      let collision = false;
      for (const element of [...labels, ...icons]) {
        const box = await element.boundingBox();
        if (box && isPointInsideBox(point, box)) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        return point;
      }
    }

    return {
      x: dropdownBox.x + dropdownBox.width / 2,
      y: dropdownBox.y + dropdownBox.height / 2,
    };
  };

  return await findNonCollidingPoint();
}
