// Reset all inputs and calculated data
const resetAll = () => {
  setInventory({});
  setRequiredSquads([]);
  setSolutions([]);
};
import React, { useState, useEffect } from "react";
import _ from "lodash";

const SBCCalculator = () => {
  // State for user's card inventory by rating
  const [inventory, setInventory] = useState({});

  // State for required squads
  const [requiredSquads, setRequiredSquads] = useState([]);

  // State for a new squad to add
  const [newSquadRating, setNewSquadRating] = useState(83);
  const [newSquadCount, setNewSquadCount] = useState(1);

  // State for a new card rating to add to inventory
  const [newCardRating, setNewCardRating] = useState(83);
  const [newCardCount, setNewCardCount] = useState(1);

  // State for generated solutions
  const [solutions, setSolutions] = useState([]);

  // Rating combinations for each squad rating (simplified version of data you provided)
  // These are sample combinations from your data
  const ratingCombinations = {
    87: [
      { 82: 1, 87: 10 },
      { 85: 1, 86: 3, 87: 6, 88: 1 },
      { 85: 6, 87: 1, 88: 4 },
      { 84: 1, 85: 4, 86: 1, 87: 1, 88: 4 },
      { 86: 2, 87: 9 },
      { 85: 3, 86: 3, 87: 2, 88: 3 },
      { 86: 6, 87: 3, 88: 2 },
      { 82: 4, 87: 2, 88: 5 },
      { 85: 1, 86: 6, 87: 1, 88: 3 },
      { 86: 6, 87: 4, 89: 1 },
      { 85: 1, 86: 6, 87: 2, 88: 1, 89: 1 },
      { 85: 6, 87: 3, 89: 2 },
      { 84: 2, 85: 5, 88: 2, 89: 2 },
      { 82: 3, 83: 2, 88: 5, 89: 1 },
      { 85: 2, 86: 6, 87: 1, 89: 2 },
      { 86: 9, 89: 2 },
      { 85: 3, 86: 3, 87: 4, 90: 1 },
      { 85: 1, 86: 6, 87: 3, 90: 1 },
      { 83: 4, 84: 1, 86: 1, 88: 4, 90: 1 },
      { 85: 2, 86: 7, 89: 1, 90: 1 },
      { 84: 1, 86: 8, 89: 1, 90: 1 },
    ],
    88: [
      { 86: 1, 87: 6, 88: 3, 91: 1 },
      { 86: 3, 87: 3, 88: 4, 91: 1 },
      { 86: 1, 87: 3, 88: 6, 89: 1 },
      { 87: 6, 88: 3, 89: 2 },
      { 83: 1, 88: 10 },
      { 86: 1, 87: 6, 88: 1, 89: 3 },
      { 87: 2, 88: 9 },
      { 86: 3, 87: 3, 88: 2, 89: 3 },
      { 86: 2, 87: 7, 90: 1, 91: 1 },
      { 85: 1, 87: 8, 90: 1, 91: 1 },
      { 87: 6, 88: 4, 90: 1 },
      { 86: 6, 88: 1, 89: 4 },
      { 85: 1, 86: 4, 87: 1, 88: 1, 89: 4 },
      { 86: 1, 87: 6, 88: 2, 89: 1, 90: 1 },
      { 84: 4, 85: 1, 87: 1, 89: 4, 91: 1 },
      { 83: 4, 88: 2, 89: 5 },
      { 87: 9, 90: 2 },
      { 86: 2, 87: 6, 88: 1, 90: 2 },
      { 86: 6, 88: 3, 90: 2 },
      { 85: 2, 86: 5, 89: 2, 90: 2 },
      { 83: 3, 84: 2, 89: 5, 90: 1 },
    ],
    89: [
      { 87: 2, 88: 7, 91: 1, 92: 1 },
      { 87: 6, 89: 3, 91: 2 },
      { 87: 1, 88: 6, 89: 2, 90: 1, 91: 1 },
      { 86: 1, 88: 8, 91: 1, 92: 1 },
      { 87: 2, 88: 6, 89: 1, 91: 2 },
      { 88: 6, 89: 4, 91: 1 },
      { 88: 9, 91: 2 },
      { 87: 1, 88: 6, 89: 3, 92: 1 },
      { 87: 3, 88: 3, 89: 4, 92: 1 },
      { 86: 2, 87: 5, 90: 2, 91: 2 },
      { 87: 3, 88: 3, 89: 2, 90: 3 },
      { 88: 6, 89: 3, 90: 2 },
      { 87: 1, 88: 3, 89: 6, 90: 1 },
      { 87: 1, 88: 6, 89: 1, 90: 3 },
      { 87: 6, 89: 1, 90: 4 },
      { 86: 1, 87: 4, 88: 1, 89: 1, 90: 4 },
      { 88: 2, 89: 9 },
      { 84: 1, 89: 10 },
      { 84: 3, 85: 2, 90: 5, 91: 1 },
      { 85: 4, 86: 1, 88: 1, 90: 4, 92: 1 },
      { 84: 4, 89: 2, 90: 5 },
    ],
    90: [
      { 87: 2, 88: 5, 91: 2, 92: 2 },
      { 88: 6, 90: 1, 91: 4 },
      { 87: 1, 88: 4, 89: 1, 90: 1, 91: 4 },
      { 88: 6, 90: 3, 92: 2 },
      { 88: 1, 89: 6, 90: 2, 91: 1, 92: 1 },
      { 88: 3, 89: 3, 90: 2, 91: 3 },
      { 88: 2, 89: 6, 90: 1, 92: 2 },
      { 85: 3, 86: 2, 91: 5, 92: 1 },
      { 88: 1, 89: 6, 90: 1, 91: 3 },
      { 86: 4, 87: 1, 89: 1, 91: 4, 93: 1 },
      { 89: 9, 92: 2 },
      { 88: 2, 89: 7, 92: 1, 93: 1 },
      { 85: 4, 90: 2, 91: 5 },
      { 87: 1, 89: 8, 92: 1, 93: 1 },
      { 89: 6, 90: 3, 91: 2 },
      { 88: 3, 89: 3, 90: 4, 93: 1 },
      { 88: 1, 89: 3, 90: 6, 91: 1 },
      { 89: 6, 90: 4, 92: 1 },
      { 88: 1, 89: 6, 90: 3, 93: 1 },
      { 89: 2, 90: 9 },
      { 85: 1, 90: 10 },
    ],
  };

  // Add a new squad requirement
  const addSquad = () => {
    if (newSquadRating >= 83 && newSquadRating <= 90) {
      setRequiredSquads([
        ...requiredSquads,
        { rating: newSquadRating, count: newSquadCount },
      ]);
    }
  };

  // Add cards to inventory
  const addCards = () => {
    if (newCardRating >= 82 && newCardRating <= 93) {
      setInventory({
        ...inventory,
        [newCardRating]: (inventory[newCardRating] || 0) + newCardCount,
      });
    }
  };

  // Remove a card from inventory
  const removeCard = (rating) => {
    const updatedInventory = { ...inventory };
    delete updatedInventory[rating];
    setInventory(updatedInventory);
  };

  // Update card count in inventory
  const updateCardCount = (rating, newCount) => {
    if (newCount <= 0) {
      removeCard(rating);
      return;
    }

    const updatedInventory = { ...inventory };
    updatedInventory[rating] = newCount;
    setInventory(updatedInventory);
  };

  // Remove a squad requirement
  const removeSquad = (index) => {
    const updatedSquads = [...requiredSquads];
    updatedSquads.splice(index, 1);
    setRequiredSquads(updatedSquads);
  };

  // Update squad count
  const updateSquadCount = (index, newCount) => {
    if (newCount <= 0) {
      removeSquad(index);
      return;
    }

    const updatedSquads = [...requiredSquads];
    updatedSquads[index] = {
      ...updatedSquads[index],
      count: newCount,
    };
    setRequiredSquads(updatedSquads);
  };

  // Calculate if a combination is possible with current inventory
  const isCombinationPossible = (combination, remainingInventory) => {
    // Deep clone the inventory to avoid modifying the original
    const inventoryCopy = _.cloneDeep(remainingInventory);
    const missing = {};
    let hasMissing = false;

    // Check if we have enough cards for this combination
    for (const [rating, count] of Object.entries(combination)) {
      const available = inventoryCopy[rating] || 0;
      if (available < count) {
        missing[rating] = count - available;
        hasMissing = true;
      } else {
        inventoryCopy[rating] -= count;
      }
    }

    if (hasMissing) {
      return { possible: false, missing };
    }

    return { possible: true, inventory: inventoryCopy };
  };

  // Get the best combination for a squad based on available inventory
  const getBestCombination = (squadRating, remainingInventory) => {
    if (!ratingCombinations[squadRating]) {
      return {
        possible: false,
        message: `No combinations found for rating ${squadRating}`,
      };
    }

    let bestMissing = null;

    for (const combination of ratingCombinations[squadRating]) {
      const result = isCombinationPossible(combination, remainingInventory);

      if (result.possible) {
        return {
          possible: true,
          combination,
          remainingInventory: result.inventory,
        };
      } else if (
        !bestMissing ||
        Object.values(result.missing).reduce((a, b) => a + b, 0) <
          Object.values(bestMissing.missing).reduce((a, b) => a + b, 0)
      ) {
        // Track the combination that requires the fewest additional cards
        bestMissing = {
          combination,
          missing: result.missing,
        };
      }
    }

    return {
      possible: false,
      message: `Not enough cards for rating ${squadRating} squad`,
      missingCards: bestMissing,
    };
  };

  // Generate solutions based on inventory and required squads
  const generateSolutions = () => {
    // Sort required squads by rating (highest first)
    const sortedSquads = [...requiredSquads].sort(
      (a, b) => b.rating - a.rating
    );

    let currentInventory = _.cloneDeep(inventory);
    const generatedSolutions = [];
    let allPossible = true;
    let totalMissingCards = {};
    let usedCards = {};

    // Process each required squad
    for (const squad of sortedSquads) {
      const squadSolutions = [];

      // Generate solutions for each instance of this squad rating
      for (let i = 0; i < squad.count; i++) {
        const solution = getBestCombination(squad.rating, currentInventory);

        if (solution.possible) {
          squadSolutions.push({
            squadRating: squad.rating,
            combination: solution.combination,
          });

          // Track used cards
          Object.entries(solution.combination).forEach(([rating, count]) => {
            if (count > 0) {
              usedCards[rating] = (usedCards[rating] || 0) + count;
            }
          });

          currentInventory = solution.remainingInventory;
        } else {
          allPossible = false;
          squadSolutions.push({
            squadRating: squad.rating,
            error: solution.message,
            missingCards: solution.missingCards,
          });

          // Aggregate missing cards for summary
          if (solution.missingCards) {
            Object.entries(solution.missingCards.missing).forEach(
              ([rating, count]) => {
                totalMissingCards[rating] =
                  (totalMissingCards[rating] || 0) + count;
              }
            );
          }
        }
      }

      generatedSolutions.push({
        rating: squad.rating,
        count: squad.count,
        solutions: squadSolutions,
      });
    }

    setSolutions({
      allPossible,
      squads: generatedSolutions,
      remainingCards: currentInventory,
      totalMissingCards:
        Object.keys(totalMissingCards).length > 0 ? totalMissingCards : null,
      usedCards: usedCards,
    });
  };

  // Format the rating combination for display
  const formatCombination = (combination) => {
    return Object.entries(combination)
      .filter(([, count]) => count > 0)
      .map(([rating, count]) => `${rating} × ${count}`)
      .join(", ");
  };

  // Calculate total cards required for verification
  const calculateTotalCards = () => {
    let total = 0;

    requiredSquads.forEach((squad) => {
      total += squad.count * 11; // Each squad needs 11 players
    });

    return total;
  };

  // Calculate total available cards
  const calculateAvailableCards = () => {
    return Object.values(inventory).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">FC SBC Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Inventory Section */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Your Card Inventory</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(inventory).map(([rating, count]) => (
              <div
                key={rating}
                className="bg-white shadow rounded p-2 text-center group relative"
              >
                <button
                  onClick={() => removeCard(rating)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <div className="font-bold">{rating} OVR</div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateCardCount(rating, count - 1)}
                    className="text-gray-500 hover:text-gray-700 w-6 h-6"
                  >
                    −
                  </button>
                  <span>{count}</span>
                  <button
                    onClick={() => updateCardCount(rating, count + 1)}
                    className="text-gray-500 hover:text-gray-700 w-6 h-6"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {Object.keys(inventory).length === 0 && (
              <p className="text-gray-500 italic">No cards added yet</p>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <input
                type="number"
                min="82"
                max="93"
                value={newCardRating}
                onChange={(e) => setNewCardRating(parseInt(e.target.value))}
                className="border rounded p-2 w-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={newCardCount}
                onChange={(e) => setNewCardCount(parseInt(e.target.value))}
                className="border rounded p-2 w-24"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addCards}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Cards
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <div>
              Total Cards Available:{" "}
              <span className="font-bold">{calculateAvailableCards()}</span>
            </div>
          </div>
        </div>

        {/* Required Squads Section */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Required Squads</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {requiredSquads.map((squad, index) => (
              <div
                key={index}
                className="bg-white shadow rounded p-2 text-center group relative"
              >
                <button
                  onClick={() => removeSquad(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <div className="font-bold">{squad.rating} OVR</div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateSquadCount(index, squad.count - 1)}
                    className="text-gray-500 hover:text-gray-700 w-6 h-6"
                  >
                    −
                  </button>
                  <span>{squad.count}</span>
                  <button
                    onClick={() => updateSquadCount(index, squad.count + 1)}
                    className="text-gray-500 hover:text-gray-700 w-6 h-6"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {requiredSquads.length === 0 && (
              <p className="text-gray-500 italic">No squads added yet</p>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Squad Rating
              </label>
              <input
                type="number"
                min="83"
                max="90"
                value={newSquadRating}
                onChange={(e) => setNewSquadRating(parseInt(e.target.value))}
                className="border rounded p-2 w-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={newSquadCount}
                onChange={(e) => setNewSquadCount(parseInt(e.target.value))}
                className="border rounded p-2 w-24"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addSquad}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Squad
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <div>
              Total Players Needed:{" "}
              <span className="font-bold">{calculateTotalCards()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={generateSolutions}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-bold"
          disabled={
            requiredSquads.length === 0 || Object.keys(inventory).length === 0
          }
        >
          Calculate Solutions
        </button>

        <button
          onClick={resetAll}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded font-bold"
        >
          Reset All
        </button>
      </div>

      {/* Solutions Section */}
      {solutions.squads && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Solutions</h2>

          {!solutions.allPossible && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
              <p className="font-bold">
                Not all squads could be completed with your current inventory
              </p>
              <p>
                Missing cards are highlighted below for each incomplete squad
              </p>
            </div>
          )}

          {solutions.squads.map((squadGroup, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {squadGroup.rating} OVR Squad ({squadGroup.count})
              </h3>

              <div className="space-y-3">
                {squadGroup.solutions.map((solution, solutionIndex) => (
                  <div
                    key={solutionIndex}
                    className="bg-white shadow rounded p-3"
                  >
                    {solution.error ? (
                      <div>
                        <div className="text-red-500 mb-2">
                          {solution.error}
                        </div>

                        {solution.missingCards && (
                          <div>
                            <div className="font-semibold text-sm mb-1">
                              Best possible combination:
                            </div>
                            <div className="text-sm mb-2">
                              {formatCombination(
                                solution.missingCards.combination
                              )}
                            </div>

                            <div className="bg-red-50 p-2 rounded border border-red-200">
                              <div className="font-semibold text-sm text-red-700 mb-1">
                                Missing cards:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(
                                  solution.missingCards.missing
                                ).map(([rating, count]) => (
                                  <div
                                    key={rating}
                                    className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm"
                                  >
                                    {rating} OVR × {count}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="font-medium">
                        {formatCombination(solution.combination)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Used Cards Summary */}
          {solutions.usedCards &&
            Object.keys(solutions.usedCards).length > 0 && (
              <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="text-lg font-semibold mb-2 text-green-700">
                  Cards Used in Solutions
                </h3>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(solutions.usedCards)
                    .sort((a, b) => parseInt(b[0]) - parseInt(a[0])) // Sort by rating high to low
                    .map(([rating, count]) => (
                      <div
                        key={rating}
                        className="bg-white shadow border border-green-200 rounded p-2 text-center"
                      >
                        <div className="font-bold">{rating} OVR</div>
                        <div className="text-green-600 font-semibold">
                          {count} used
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

          {/* Missing Cards Summary */}
          {solutions.totalMissingCards && (
            <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="text-lg font-semibold mb-2 text-red-700">
                Cards You Need to Get
              </h3>

              <div className="flex flex-wrap gap-2">
                {Object.entries(solutions.totalMissingCards)
                  .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                  .map(([rating, count]) => (
                    <div
                      key={rating}
                      className="bg-white shadow border border-red-200 rounded p-2 text-center"
                    >
                      <div className="font-bold">{rating} OVR</div>
                      <div className="text-red-600 font-semibold">
                        Need {count} more
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Remaining Cards */}
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Remaining Cards</h3>

            <div className="flex flex-wrap gap-2">
              {Object.entries(solutions.remainingCards || {})
                .filter(([, count]) => count > 0)
                .map(([rating, count]) => (
                  <div
                    key={rating}
                    className="bg-white shadow rounded p-2 text-center"
                  >
                    <div className="font-bold">{rating} OVR</div>
                    <div>
                      {count} card{count > 1 ? "s" : ""}
                    </div>
                  </div>
                ))}

              {Object.values(solutions.remainingCards || {}).every(
                (count) => count === 0
              ) && <p className="text-gray-500 italic">No cards remaining</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SBCCalculator;
