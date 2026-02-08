/* ============================================
   DINNER DECIDER - App Logic
   ============================================ */

(function () {
  'use strict';

  // ── State ──────────────────────────────────
  const state = {
    player1: {},
    player2: {},
  };

  // ── Meal Database ──────────────────────────
  const meals = [
    // Breakfast
    { name: 'Pancake Stack', cuisine: 'american', meal: 'breakfast', effort: 'low', time: 30, budget: 'cheap', mood: ['comfort', 'indulgent'], dietary: [], desc: 'Fluffy pancakes with butter and maple syrup.' },
    { name: 'Avocado Toast', cuisine: 'american', meal: 'breakfast', effort: 'none', time: 15, budget: 'cheap', mood: ['healthy'], dietary: ['vegan'], desc: 'Smashed avocado on sourdough with everything seasoning.' },
    { name: 'Breakfast Burrito', cuisine: 'mexican', meal: 'breakfast', effort: 'medium', time: 30, budget: 'cheap', mood: ['comfort', 'indulgent'], dietary: [], desc: 'Scrambled eggs, cheese, beans, and salsa wrapped up tight.' },
    { name: 'Smoothie Bowl', cuisine: 'american', meal: 'breakfast', effort: 'none', time: 15, budget: 'cheap', mood: ['healthy'], dietary: ['vegan', 'glutenfree', 'dairyfree'], desc: 'Blended acai with granola, banana, and berries.' },
    { name: 'Eggs Benedict', cuisine: 'american', meal: 'breakfast', effort: 'high', time: 60, budget: 'moderate', mood: ['indulgent'], dietary: [], desc: 'Poached eggs and hollandaise on English muffins.' },
    { name: 'French Toast', cuisine: 'american', meal: 'breakfast', effort: 'low', time: 30, budget: 'cheap', mood: ['comfort', 'indulgent'], dietary: [], desc: 'Cinnamon-dusted brioche with maple syrup and berries.' },
    { name: 'Overnight Oats', cuisine: 'american', meal: 'breakfast', effort: 'none', time: 15, budget: 'cheap', mood: ['healthy'], dietary: ['vegetarian', 'glutenfree'], desc: 'Chilled oats with chia seeds, fruit, and honey.' },

    // Lunch
    { name: 'Grilled Cheese & Tomato Soup', cuisine: 'american', meal: 'lunch', effort: 'low', time: 30, budget: 'cheap', mood: ['comfort'], dietary: ['vegetarian'], desc: 'The classic combo. Crispy bread, melty cheese, warm soup.' },
    { name: 'Chicken Caesar Wrap', cuisine: 'american', meal: 'lunch', effort: 'low', time: 15, budget: 'cheap', mood: ['healthy'], dietary: [], desc: 'Grilled chicken, romaine, parmesan, and caesar in a tortilla.' },
    { name: 'Poke Bowl', cuisine: 'asian', meal: 'lunch', effort: 'medium', time: 30, budget: 'moderate', mood: ['healthy', 'adventurous'], dietary: ['glutenfree', 'dairyfree'], desc: 'Fresh tuna, rice, edamame, avocado, and ponzu.' },
    { name: 'BLT Sandwich', cuisine: 'american', meal: 'lunch', effort: 'none', time: 15, budget: 'cheap', mood: ['comfort'], dietary: [], desc: 'Bacon, lettuce, and tomato on toasted bread. Simple perfection.' },
    { name: 'Mediterranean Salad', cuisine: 'mediterranean', meal: 'lunch', effort: 'low', time: 15, budget: 'cheap', mood: ['healthy'], dietary: ['vegetarian', 'glutenfree'], desc: 'Cucumber, tomato, olives, feta, and lemon-herb dressing.' },
    { name: 'Quesadilla', cuisine: 'mexican', meal: 'lunch', effort: 'low', time: 15, budget: 'cheap', mood: ['comfort'], dietary: ['vegetarian'], desc: 'Crispy tortilla loaded with melted cheese and your pick of fillings.' },
    { name: 'Ramen', cuisine: 'asian', meal: 'lunch', effort: 'medium', time: 60, budget: 'moderate', mood: ['comfort', 'adventurous'], dietary: [], desc: 'Rich broth, noodles, soft-boiled egg, and all the fixings.' },

    // Dinner
    { name: 'Spaghetti Bolognese', cuisine: 'italian', meal: 'dinner', effort: 'medium', time: 60, budget: 'cheap', mood: ['comfort'], dietary: [], desc: 'Hearty meat sauce over pasta. A crowd-pleaser every time.' },
    { name: 'Tacos', cuisine: 'mexican', meal: 'dinner', effort: 'medium', time: 30, budget: 'cheap', mood: ['comfort', 'adventurous'], dietary: ['glutenfree'], desc: 'Seasoned protein, fresh salsa, and all the toppings.' },
    { name: 'Stir Fry', cuisine: 'asian', meal: 'dinner', effort: 'medium', time: 30, budget: 'cheap', mood: ['healthy', 'adventurous'], dietary: ['vegan', 'glutenfree', 'dairyfree'], desc: 'Crispy veggies and protein tossed in savory sauce over rice.' },
    { name: 'Margherita Pizza', cuisine: 'italian', meal: 'dinner', effort: 'high', time: 90, budget: 'cheap', mood: ['comfort', 'indulgent'], dietary: ['vegetarian'], desc: 'Fresh mozzarella, basil, and San Marzano tomatoes on crispy dough.' },
    { name: 'Chicken Tikka Masala', cuisine: 'indian', meal: 'dinner', effort: 'high', time: 60, budget: 'moderate', mood: ['comfort', 'adventurous'], dietary: ['glutenfree'], desc: 'Tender chicken in creamy, spiced tomato sauce with naan.' },
    { name: 'Grilled Salmon', cuisine: 'american', meal: 'dinner', effort: 'medium', time: 30, budget: 'fancy', mood: ['healthy', 'indulgent'], dietary: ['glutenfree', 'dairyfree'], desc: 'Perfectly seared salmon with lemon, asparagus, and rice.' },
    { name: 'Burger Night', cuisine: 'american', meal: 'dinner', effort: 'medium', time: 30, budget: 'moderate', mood: ['comfort', 'indulgent'], dietary: [], desc: 'Juicy smash burgers with all your favorite toppings.' },
    { name: 'Pad Thai', cuisine: 'asian', meal: 'dinner', effort: 'medium', time: 30, budget: 'cheap', mood: ['adventurous'], dietary: ['glutenfree', 'dairyfree'], desc: 'Sweet, sour, and savory noodles with peanuts and lime.' },
    { name: 'Falafel Plate', cuisine: 'mediterranean', meal: 'dinner', effort: 'medium', time: 60, budget: 'cheap', mood: ['healthy', 'adventurous'], dietary: ['vegan', 'dairyfree'], desc: 'Crispy falafel with hummus, pita, and fresh veggies.' },
    { name: 'Chicken Parm', cuisine: 'italian', meal: 'dinner', effort: 'high', time: 60, budget: 'moderate', mood: ['comfort', 'indulgent'], dietary: [], desc: 'Crispy breaded chicken smothered in sauce and mozzarella.' },
    { name: 'Shrimp Scampi', cuisine: 'italian', meal: 'dinner', effort: 'medium', time: 30, budget: 'moderate', mood: ['indulgent'], dietary: ['dairyfree'], desc: 'Garlic butter shrimp over linguine with white wine and lemon.' },
    { name: 'Curry & Rice', cuisine: 'indian', meal: 'dinner', effort: 'medium', time: 60, budget: 'cheap', mood: ['comfort', 'adventurous'], dietary: ['vegan', 'glutenfree', 'dairyfree'], desc: 'Fragrant coconut curry with chickpeas and vegetables.' },
    { name: 'Steak & Potatoes', cuisine: 'american', meal: 'dinner', effort: 'high', time: 60, budget: 'fancy', mood: ['indulgent'], dietary: ['glutenfree'], desc: 'Pan-seared steak with garlic mashed potatoes.' },
    { name: 'Enchiladas', cuisine: 'mexican', meal: 'dinner', effort: 'high', time: 60, budget: 'moderate', mood: ['comfort'], dietary: [], desc: 'Rolled tortillas baked in red or green sauce with cheese.' },
    { name: 'Greek Chicken Bowl', cuisine: 'mediterranean', meal: 'dinner', effort: 'medium', time: 30, budget: 'cheap', mood: ['healthy'], dietary: ['glutenfree'], desc: 'Grilled chicken, quinoa, cucumber, olives, and tzatziki.' },
    { name: 'Veggie Buddha Bowl', cuisine: 'american', meal: 'dinner', effort: 'low', time: 30, budget: 'cheap', mood: ['healthy'], dietary: ['vegan', 'glutenfree', 'dairyfree'], desc: 'Roasted veggies, grains, avocado, and tahini dressing.' },

    // Snacks
    { name: 'Nachos', cuisine: 'mexican', meal: 'snack', effort: 'low', time: 15, budget: 'cheap', mood: ['comfort', 'indulgent'], dietary: ['vegetarian', 'glutenfree'], desc: 'Loaded chips with cheese, salsa, guac, and sour cream.' },
    { name: 'Charcuterie Board', cuisine: 'mediterranean', meal: 'snack', effort: 'low', time: 15, budget: 'moderate', mood: ['indulgent', 'adventurous'], dietary: ['glutenfree'], desc: 'Cured meats, cheeses, crackers, fruit, and honey.' },
    { name: 'Hummus & Veggies', cuisine: 'mediterranean', meal: 'snack', effort: 'none', time: 15, budget: 'cheap', mood: ['healthy'], dietary: ['vegan', 'glutenfree', 'dairyfree'], desc: 'Creamy hummus with fresh-cut vegetables for dipping.' },
    { name: 'Popcorn & Movie Night', cuisine: 'american', meal: 'snack', effort: 'none', time: 15, budget: 'cheap', mood: ['comfort'], dietary: ['vegan', 'glutenfree', 'dairyfree'], desc: 'Butter (or not) popcorn and your favorite film.' },
    { name: 'Spring Rolls', cuisine: 'asian', meal: 'snack', effort: 'medium', time: 30, budget: 'cheap', mood: ['healthy', 'adventurous'], dietary: ['vegan', 'glutenfree', 'dairyfree'], desc: 'Fresh rice paper rolls with veggies and peanut dipping sauce.' },
  ];

  // ── Effort mapping ─────────────────────────
  const effortMap = { none: 0, low: 1, medium: 2, high: 3 };
  const timeMap = { 15: 0, 30: 1, 60: 2, 90: 3 };
  const budgetMap = { cheap: 0, moderate: 1, fancy: 2, any: 3 };

  // ── DOM refs ───────────────────────────────
  const alignmentFill = document.getElementById('alignmentFill');
  const alignmentValue = document.getElementById('alignmentValue');
  const alignmentDesc = document.getElementById('alignmentDesc');
  const decideBtn = document.getElementById('decideBtn');
  const resultSection = document.getElementById('resultSection');
  const resultMeal = document.getElementById('resultMeal');
  const resultDesc = document.getElementById('resultDesc');
  const resultTags = document.getElementById('resultTags');
  const rerollBtn = document.getElementById('rerollBtn');

  // ── Initialize button groups ───────────────
  document.querySelectorAll('.button-group').forEach(function (group) {
    var isMulti = group.classList.contains('multi');
    var field = group.dataset.field;
    var player = group.dataset.player;

    group.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (isMulti) {
          handleMultiSelect(btn, group, field, player);
        } else {
          handleSingleSelect(btn, group, field, player);
        }
        updateAlignment();
      });
    });
  });

  function handleSingleSelect(btn, group, field, player) {
    group.querySelectorAll('button').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    var key = 'player' + player;
    state[key][field] = btn.dataset.value;
  }

  function handleMultiSelect(btn, group, field, player) {
    var value = btn.dataset.value;
    var key = 'player' + player;

    if (value === 'none') {
      group.querySelectorAll('button').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      state[key][field] = ['none'];
      return;
    }

    // Deselect "none" when picking specific options
    var noneBtn = group.querySelector('[data-value="none"]');
    if (noneBtn) noneBtn.classList.remove('active');

    btn.classList.toggle('active');

    var selected = [];
    group.querySelectorAll('button.active').forEach(function (b) {
      selected.push(b.dataset.value);
    });

    if (selected.length === 0) {
      state[key][field] = undefined;
    } else {
      state[key][field] = selected;
    }
  }

  // ── Alignment Meter ────────────────────────
  var alignmentMessages = [
    { max: 20, text: 'Total mismatch... this could get spicy', color: '#ff2d95' },
    { max: 40, text: 'Pretty different vibes tonight', color: '#ff6a00' },
    { max: 60, text: 'Some common ground to work with', color: '#ffe600' },
    { max: 80, text: 'You two are mostly on the same page', color: '#b0ff40' },
    { max: 100, text: 'Mind meld! You want the same thing', color: '#39ff14' },
  ];

  function updateAlignment() {
    var p1 = state.player1;
    var p2 = state.player2;
    var fields = ['mealType', 'time', 'mood', 'effort', 'cuisine', 'budget'];
    var matchable = 0;
    var score = 0;

    fields.forEach(function (f) {
      if (p1[f] !== undefined && p2[f] !== undefined) {
        matchable++;
        if (f === 'time') {
          var diff = Math.abs(timeMap[p1[f]] - timeMap[p2[f]]);
          score += 1 - diff / 3;
        } else if (f === 'effort') {
          var diff = Math.abs(effortMap[p1[f]] - effortMap[p2[f]]);
          score += 1 - diff / 3;
        } else if (f === 'budget') {
          if (p1[f] === 'any' || p2[f] === 'any') {
            score += 1;
          } else {
            var diff = Math.abs(budgetMap[p1[f]] - budgetMap[p2[f]]);
            score += 1 - diff / 2;
          }
        } else if (f === 'cuisine') {
          if (p1[f] === 'any' || p2[f] === 'any' || p1[f] === p2[f]) {
            score += 1;
          } else {
            score += 0;
          }
        } else {
          score += p1[f] === p2[f] ? 1 : 0;
        }
      }
    });

    // Dietary overlap
    if (p1.dietary && p2.dietary) {
      matchable++;
      var set1 = p1.dietary;
      var set2 = p2.dietary;
      if (arraysEqual(set1, ['none']) && arraysEqual(set2, ['none'])) {
        score += 1;
      } else if (arraysEqual(set1, ['none']) || arraysEqual(set2, ['none'])) {
        score += 0.5;
      } else {
        var overlap = set1.filter(function (v) { return set2.indexOf(v) !== -1; });
        var union = arrayUnique(set1.concat(set2));
        score += union.length > 0 ? overlap.length / union.length : 0;
      }
    }

    if (matchable === 0) {
      alignmentFill.style.width = '0%';
      alignmentValue.textContent = '---%';
      alignmentDesc.textContent = 'Set your preferences to see alignment';
      alignmentValue.style.color = 'var(--neon-green)';
      return;
    }

    var pct = Math.round((score / matchable) * 100);
    alignmentFill.style.width = pct + '%';
    alignmentValue.textContent = pct + '%';

    var msg = alignmentMessages[alignmentMessages.length - 1];
    for (var i = 0; i < alignmentMessages.length; i++) {
      if (pct <= alignmentMessages[i].max) {
        msg = alignmentMessages[i];
        break;
      }
    }
    alignmentDesc.textContent = msg.text;
    alignmentValue.style.color = msg.color;
    alignmentValue.style.textShadow = '0 0 10px ' + msg.color;
  }

  // ── Scoring & Recommendation Engine ────────
  function scoreMeal(meal, p1, p2) {
    var score = 0;

    // Meal type match (high weight)
    var mealTypes = [p1.mealType, p2.mealType].filter(Boolean);
    if (mealTypes.length > 0) {
      var mealMatch = mealTypes.filter(function (m) { return m === meal.meal; }).length;
      score += (mealMatch / mealTypes.length) * 30;
    } else {
      score += 15; // neutral if nobody picked
    }

    // Cuisine match
    var cuisines = [p1.cuisine, p2.cuisine].filter(Boolean);
    if (cuisines.length > 0) {
      var cuisineMatch = cuisines.filter(function (c) { return c === 'any' || c === meal.cuisine; }).length;
      score += (cuisineMatch / cuisines.length) * 20;
    } else {
      score += 10;
    }

    // Mood match
    var moods = [p1.mood, p2.mood].filter(Boolean);
    if (moods.length > 0) {
      var moodMatch = moods.filter(function (m) { return meal.mood.indexOf(m) !== -1; }).length;
      score += (moodMatch / moods.length) * 20;
    } else {
      score += 10;
    }

    // Time compatibility - prefer meals that fit within both players' time
    var times = [p1.time, p2.time].filter(Boolean).map(Number);
    if (times.length > 0) {
      var minTime = Math.min.apply(null, times);
      if (meal.time <= minTime) {
        score += 10;
      } else if (meal.time <= minTime + 15) {
        score += 5;
      }
    } else {
      score += 5;
    }

    // Effort compatibility
    var efforts = [p1.effort, p2.effort].filter(Boolean);
    if (efforts.length > 0) {
      var avgEffort = efforts.reduce(function (sum, e) { return sum + effortMap[e]; }, 0) / efforts.length;
      var mealEffort = effortMap[meal.effort];
      var effortDiff = Math.abs(avgEffort - mealEffort);
      score += Math.max(0, 10 - effortDiff * 4);
    } else {
      score += 5;
    }

    // Budget compatibility
    var budgets = [p1.budget, p2.budget].filter(Boolean);
    if (budgets.length > 0) {
      var budgetOk = budgets.every(function (b) {
        if (b === 'any') return true;
        return budgetMap[b] >= budgetMap[meal.budget];
      });
      score += budgetOk ? 10 : 0;
    } else {
      score += 5;
    }

    // Dietary compatibility - meal must satisfy all restrictions from both players
    var allDietary = (p1.dietary || []).concat(p2.dietary || []);
    allDietary = arrayUnique(allDietary).filter(function (d) { return d !== 'none'; });
    if (allDietary.length > 0) {
      var satisfied = allDietary.every(function (d) {
        return meal.dietary.indexOf(d) !== -1;
      });
      // Partial credit if some are satisfied
      if (satisfied) {
        score += 10;
      } else {
        var partial = allDietary.filter(function (d) { return meal.dietary.indexOf(d) !== -1; }).length;
        score += (partial / allDietary.length) * 4;
      }
    } else {
      score += 10;
    }

    return score;
  }

  function getRecommendations(p1, p2) {
    var scored = meals.map(function (meal) {
      return { meal: meal, score: scoreMeal(meal, p1, p2) };
    });

    scored.sort(function (a, b) { return b.score - a.score; });

    // Return top candidates (within 85% of best score)
    var bestScore = scored[0].score;
    var threshold = bestScore * 0.85;
    return scored.filter(function (s) { return s.score >= threshold; });
  }

  // ── Decide button ──────────────────────────
  var lastRecommendations = [];
  var lastPickIndex = -1;

  decideBtn.addEventListener('click', function () {
    var p1 = state.player1;
    var p2 = state.player2;

    // Need at least some input from both
    var p1Fields = Object.keys(p1).length;
    var p2Fields = Object.keys(p2).length;
    if (p1Fields === 0 && p2Fields === 0) {
      flashButton(decideBtn, 'CHOOSE SOMETHING FIRST!');
      return;
    }

    lastRecommendations = getRecommendations(p1, p2);
    lastPickIndex = 0;
    showResult(lastRecommendations[0].meal);
  });

  rerollBtn.addEventListener('click', function () {
    if (lastRecommendations.length <= 1) {
      flashButton(rerollBtn, 'NO MORE OPTIONS');
      return;
    }
    lastPickIndex = (lastPickIndex + 1) % lastRecommendations.length;
    spinAndShow(lastRecommendations[lastPickIndex].meal);
  });

  function showResult(meal) {
    resultSection.classList.remove('visible');
    // Force reflow
    void resultSection.offsetWidth;
    resultSection.classList.add('visible');

    spinAndShow(meal);
  }

  function spinAndShow(meal) {
    // Quick slot-machine spin effect
    resultMeal.classList.add('spinning');
    var spins = 0;
    var maxSpins = 8;
    var spinNames = meals.map(function (m) { return m.name; });

    var spinInterval = setInterval(function () {
      resultMeal.textContent = spinNames[Math.floor(Math.random() * spinNames.length)];
      spins++;
      if (spins >= maxSpins) {
        clearInterval(spinInterval);
        resultMeal.classList.remove('spinning');
        displayMeal(meal);
      }
    }, 80);
  }

  function displayMeal(meal) {
    resultMeal.textContent = meal.name.toUpperCase();
    resultDesc.textContent = meal.desc;

    resultTags.innerHTML = '';
    var tags = [meal.cuisine, meal.meal, meal.effort + ' effort'];
    if (meal.dietary.length > 0) {
      tags = tags.concat(meal.dietary);
    }
    tags.forEach(function (tag) {
      var span = document.createElement('span');
      span.className = 'result-tag';
      span.textContent = tag.toUpperCase();
      resultTags.appendChild(span);
    });
  }

  function flashButton(btn, msg) {
    var original = btn.textContent;
    var originalHTML = btn.innerHTML;
    btn.textContent = msg;
    btn.style.borderColor = 'var(--neon-pink)';
    btn.style.color = 'var(--neon-pink)';
    setTimeout(function () {
      btn.innerHTML = originalHTML;
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 1200);
  }

  // ── Utilities ──────────────────────────────
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function arrayUnique(arr) {
    var seen = {};
    return arr.filter(function (item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
})();
