// Data: at least 4 objects, each with 3+ properties, holding real content
const skills = [
  {
    name: "Network Defense",
    category: "Networking",
    level: "Intermediate",
    note: "Setting up firewalls, segmentation, and traffic monitoring for small networks."
  },
  {
    name: "Linux Administration",
    category: "Systems",
    level: "Intermediate",
    note: "Managing users, permissions, and services on Linux servers and workstations."
  },
  {
    name: "Wireshark",
    category: "Tools",
    level: "Beginner",
    note: "Capturing and reading packets to spot unusual or suspicious traffic."
  },
  {
    name: "Ethical Hacking Basics",
    category: "Security",
    level: "Beginner",
    note: "Reconnaissance, scanning, and responsibly reporting vulnerabilities."
  },
  {
    name: "Python Scripting",
    category: "Programming",
    level: "Intermediate",
    note: "Writing small automation and parsing scripts for security tasks."
  }
];

// Named function: takes one skill object in, RETURNS a string, never touches the page
function formatSkill(skill) {
  return (
    '<div class="skill-card">' +
      '<span class="tag mono">' + skill.category + '</span>' +
      '<h3>' + skill.name + '</h3>' +
      '<p class="skill-level mono">' + skill.level + '</p>' +
      '<p>' + skill.note + '</p>' +
    '</div>'
  );
}

// Second function: loops over a list and draws it into the empty container
function renderSkills(list) {
  const container = document.getElementById("skillList");
  if (!container) return;

  // Guard: empty or bad input gives a message, page never shows undefined or NaN
  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = '<p class="skill-empty">No matching skills found.</p>';
    return;
  }

  container.innerHTML = list.map(formatSkill).join("");
}

// Works out a new list based on the search term
function filterSkills(term) {
  const clean = (term || "").trim().toLowerCase();
  if (!clean) return skills;

  return skills.filter(function (skill) {
    return (
      skill.name.toLowerCase().includes(clean) ||
      skill.category.toLowerCase().includes(clean) ||
      skill.level.toLowerCase().includes(clean) ||
      skill.note.toLowerCase().includes(clean)
    );
  });
}

const searchInput = document.getElementById("skillSearch");

if (searchInput) {
  // Control that works out a new list and redraws it on every keystroke
  searchInput.addEventListener("input", function (event) {
    const results = filterSkills(event.target.value);
    renderSkills(results);
  });
}

// Initial draw, straight from the array
renderSkills(skills);
