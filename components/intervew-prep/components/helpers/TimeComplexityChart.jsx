import React, { useState } from "react";

const TimeComplexityChart = () => {
    const data = [
        { complexity: "O(1)", meaning: "Constant time – doesn't grow with input size", performance: "🟢 Fastest" },
        { complexity: "O(log n)", meaning: "Logarithmic time – grows slowly as input increases", performance: "🟢 Very Fast" },
        { complexity: "O(n)", meaning: "Linear time – grows directly with input size", performance: "🟢 Fast" },
        { complexity: "O(n log n)", meaning: "Log-linear time – slightly worse than linear", performance: "🟡 Moderate" },
        { complexity: "O(n²)", meaning: "Quadratic time – grows with the square of the input", performance: "🔴 Slow" },
        { complexity: "O(n³)", meaning: "Cubic time – grows with the cube of the input", performance: "🔴 Very Slow" },
        { complexity: "O(2ⁿ)", meaning: "Exponential time – doubles with every extra input", performance: "🚫 Extremely Slow" },
        { complexity: "O(n!)", meaning: "Factorial time – grows faster than exponential", performance: "🚫 Impractical" },
    ];

    return (
        <div className="px-4 py-6 max-w-5xl mx-auto font-mono">
            <h2 className="text-2xl font-bold mb-4 text-center">📊 Time Complexity Comparison Chart</h2>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3 font-medium">Complexity</th>
                            <th className="p-3 font-medium">Meaning</th>
                            <th className="p-3 font-medium">Performance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, i) => (
                            <tr key={i} className=" transition-colors">
                                <td className="p-3 whitespace-nowrap">{row.complexity}</td>
                                <td className="p-3">{row.meaning}</td>
                                <td className="p-3 text-lg">{row.performance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




const TimeSpaceComplexityCheatsheet = () => {
    const timeComplexity = [
        { type: "Constant", bigO: "O(1)", description: "Fixed time, doesn’t scale with n", examples: "Array access, hash table lookup" },
        { type: "Logarithmic", bigO: "O(log n)", description: "Time grows logarithmically", examples: "Binary search, balanced BST operations" },
        { type: "Linear", bigO: "O(n)", description: "Time scales directly with n", examples: "Linear search, single loop over array" },
        { type: "Linearithmic", bigO: "O(n log n)", description: "Common in efficient sorting", examples: "Merge sort, Heap sort, Quick sort (avg)" },
        { type: "Quadratic", bigO: "O(n²)", description: "Time scales with n squared", examples: "Bubble sort, Insertion sort" },
        { type: "Cubic", bigO: "O(n³)", description: "Time scales with n cubed", examples: "Naive matrix multiplication" },
        { type: "Exponential", bigO: "O(2ⁿ)", description: "Time doubles per input increase", examples: "Recursive Fibonacci, subset sum" },
        { type: "Factorial", bigO: "O(n!)", description: "Extremely slow, all permutations", examples: "Generating permutations, TSP brute force" },
    ];

    const spaceComplexity = [
        { type: "Constant", bigO: "O(1)", description: "Fixed memory usage", examples: "In-place algorithms, single variables" },
        { type: "Logarithmic", bigO: "O(log n)", description: "Memory grows logarithmically", examples: "Recursive binary search" },
        { type: "Linear", bigO: "O(n)", description: "Memory scales with n", examples: "Storing a list, Merge sort’s extra array" },
        { type: "Quadratic", bigO: "O(n²)", description: "Memory scales with n squared", examples: "2D matrix, graph adjacency matrix" },
        { type: "Exponential", bigO: "O(2ⁿ)", description: "Memory doubles per input increase", examples: "Storing all subsets" },
    ];

    const tips = [
        {
            title: "Time Complexity Tips",
            points: [
                "Single loop over n items → O(n).",
                "k nested loops, each n times → O(nᵏ).",
                "Recursion depth and work per level (e.g., binary search halves n each step → O(log n)).",
                "Divide and Conquer → Often O(n log n) (e.g., Merge sort).",
                "Big O focuses on worst-case scenario.",
                "Drop lower-order terms: O(n² + n) → O(n²).",
            ],
        },
        {
            title: "Space Complexity Tips",
            points: [
                "Count memory used by data structures (e.g., an array of n items → O(n)).",
                "Recursive calls add to the stack (e.g., binary search → O(log n)).",
                "Auxiliary space: temporary variables, buffers, etc.",
                "Typically ignores input size unless extra copies are made.",
            ],
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 rounded-xl shadow-md text-white">
            <h2 className="text-3xl font-bold mb-4 text-center">📘 Time & Space Complexity Cheatsheet</h2>
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What Are Time and Space Complexity?</h3>
                <ul className="list-disc ml-5 space-y-1">
                    <li><strong>Time Complexity</strong>: How long an algorithm takes to run based on input size (n). Uses <strong>Big O notation</strong>.</li>
                    <li><strong>Space Complexity</strong>: How much memory it uses. Also in <strong>Big O</strong>.</li>
                    <li><strong>Note</strong>: "n" = input size. Big O ignores constants & lower terms (e.g., O(3n² + 2n) → O(n²)).</li>
                </ul>
            </section>

            <section className="mb-6 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-2">⏱️ Time Complexity</h3>
                <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full  border rounded-md shadow text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 font-medium">Complexity</th>
                                <th className="p-3 font-medium">Big O</th>
                                <th className="p-3 font-medium">Description</th>
                                <th className="p-3 font-medium">Examples</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {timeComplexity.map((row, i) => (
                                <tr key={i} className=" transition-colors">
                                    <td className="p-2 font-medium whitespace-nowrap">{row.type}</td>
                                    <td className="p-2 whitespace-nowrap">{row.bigO}</td>
                                    <td className="p-2">{row.description}</td>
                                    <td className="p-2">{row.examples}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-6 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-2">🧠 Space Complexity</h3>
                <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full border rounded-md shadow text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 font-medium">Complexity</th>
                                <th className="p-3 font-medium">Big O</th>
                                <th className="p-3 font-medium">Description</th>
                                <th className="p-3 font-medium">Examples</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spaceComplexity.map((row, i) => (
                                <tr key={i} className=" transition-colors">
                                    <td className="p-2 font-medium whitespace-nowrap">{row.type}</td>
                                    <td className="p-2 whitespace-nowrap">{row.bigO}</td>
                                    <td className="p-2">{row.description}</td>
                                    <td className="p-2">{row.examples}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">🛠️ Tips</h3>
                {tips.map((tip, i) => (
                    <div key={i} className="mb-4">
                        <h4 className="font-bold text-md mb-1">{tip.title}</h4>
                        <ul className="list-disc ml-5 space-y-1 text-sm">
                            {tip.points.map((point, j) => (
                                <li key={j}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">📌 How to Use This Cheatsheet</h3>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Identify the Algorithm: Look at loops, recursion, or data structures.</li>
                    <li>Match Patterns: Compare with the tables above.</li>
                    <li>Calculate: Use the tips to count operations (time) or memory (space).</li>
                    <li>Simplify: Express as Big O, focusing on the dominant term.</li>
                </ol>
            </section>
        </div>
    );
};




const ComplexityCheatsheet = () => {
    // Data arrays for time and space complexity
    const timeComplexities = [
        { type: "Constant", bigO: "O(1)", description: "Fixed time, doesn't scale with input size", examples: "Array access, hash table lookup" },
        { type: "Logarithmic", bigO: "O(log n)", description: "Time grows logarithmically", examples: "Binary search, balanced BST operations" },
        { type: "Linear", bigO: "O(n)", description: "Time scales directly with input size", examples: "Linear search, single loop over array" },
        { type: "Linearithmic", bigO: "O(n log n)", description: "Common in efficient sorting", examples: "Merge sort, Heap sort, Quick sort (avg)" },
        { type: "Quadratic", bigO: "O(n²)", description: "Time scales with n squared", examples: "Bubble sort, Insertion sort" },
        { type: "Cubic", bigO: "O(n³)", description: "Time scales with n cubed", examples: "Naive matrix multiplication" },
        { type: "Exponential", bigO: "O(2ⁿ)", description: "Time doubles per input increase", examples: "Recursive Fibonacci, subset sum" },
        { type: "Factorial", bigO: "O(n!)", description: "Extremely slow, all permutations", examples: "Generating permutations, TSP brute force" },
    ];

    const spaceComplexities = [
        { type: "Constant", bigO: "O(1)", description: "Fixed memory usage", examples: "In-place algorithms, single variables" },
        { type: "Logarithmic", bigO: "O(log n)", description: "Memory grows logarithmically", examples: "Recursive binary search" },
        { type: "Linear", bigO: "O(n)", description: "Memory scales with input size", examples: "Storing an array, Merge sort's extra array" },
        { type: "Quadratic", bigO: "O(n²)", description: "Memory scales with n squared", examples: "2D matrix, graph adjacency matrix" },
        { type: "Exponential", bigO: "O(2ⁿ)", description: "Memory doubles per input increase", examples: "Storing all subsets" },
    ];

    // Tips and guidelines
    const tipsData = [
        {
            title: "Time Complexity Tips",
            items: [
                "Single loop over n items results in O(n) time.",
                "Nested loops can result in O(nᵏ) time, where k is the number of loops.",
                "Recursive algorithms require checking both depth and work per call (e.g., binary search is O(log n)).",
                "Divide and Conquer algorithms (like Merge Sort) usually run in O(n log n).",
                "Focus on the worst-case scenario and drop lower-order terms.",
            ],
        },
        {
            title: "Space Complexity Tips",
            items: [
                "Consider memory used by data structures and extra space for recursion stacks.",
                "In-place algorithms have O(1) space complexity.",
                "Auxiliary space covers temporary storage but excludes input space unless extra copies are made.",
                "Even recursive calls usually add up to O(log n) space if optimized.",
            ],
        },
    ];

    // Collapsible state for tips section
    const [isTipsOpen, setIsTipsOpen] = useState(false);
    const toggleTips = () => setIsTipsOpen(!isTipsOpen);

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-md text-gray-800">
            {/* Header Section */}
            <h2 className="text-3xl font-bold mb-4 text-center">📘 Time & Space Complexity Cheatsheet</h2>
            <p className="mb-6 text-center text-sm">
                Use this cheatsheet to quickly reference the efficiency of algorithms in terms of time (how long they run) and space (how much memory they use).
            </p>

            {/* What are time and space complexity */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What Are Time and Space Complexity?</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li><strong>Time Complexity</strong>: How long an algorithm takes to run based on the input size (n). It is expressed using <strong>Big O notation</strong>.</li>
                    <li><strong>Space Complexity</strong>: How much memory an algorithm uses, also expressed in <strong>Big O notation</strong>.</li>
                    <li><strong>Note</strong>: "n" typically represents the number of elements (e.g., array length, nodes in a graph) and lower-order terms/constants are dropped.</li>
                </ul>
            </section>

            {/* Time Complexity Table */}
            <section className="mb-6 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-2">⏱️ Time Complexity Cheatsheet</h3>
                <table className="min-w-full bg-white border rounded-md shadow text-sm">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-2 text-left">Complexity</th>
                            <th className="p-2 text-left">Big O</th>
                            <th className="p-2 text-left">Description</th>
                            <th className="p-2 text-left">Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeComplexities.map((row, index) => (
                            <tr key={index} className="even:bg-blue-50">
                                <td className="p-2 font-medium whitespace-nowrap">{row.type}</td>
                                <td className="p-2 whitespace-nowrap">{row.bigO}</td>
                                <td className="p-2">{row.description}</td>
                                <td className="p-2">{row.examples}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Space Complexity Table */}
            <section className="mb-6 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-2">🧠 Space Complexity Cheatsheet</h3>
                <table className="min-w-full bg-white border rounded-md shadow text-sm">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="p-2 text-left">Complexity</th>
                            <th className="p-2 text-left">Big O</th>
                            <th className="p-2 text-left">Description</th>
                            <th className="p-2 text-left">Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spaceComplexities.map((row, index) => (
                            <tr key={index} className="even:bg-purple-50">
                                <td className="p-2 font-medium whitespace-nowrap">{row.type}</td>
                                <td className="p-2 whitespace-nowrap">{row.bigO}</td>
                                <td className="p-2">{row.description}</td>
                                <td className="p-2">{row.examples}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Tips Section (Collapsible) */}
            <section className="mb-6">
                <button
                    onClick={toggleTips}
                    className="w-full text-left py-2 px-4 mb-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none"
                >
                    <span className="font-semibold">🛠️ {isTipsOpen ? "Hide" : "Show"} Analysis Tips</span>
                </button>
                {isTipsOpen && (
                    <div className="bg-gray-100 p-4 rounded-lg text-sm">
                        {tipsData.map((tip, index) => (
                            <div key={index} className="mb-4">
                                <h4 className="font-bold mb-1">{tip.title}</h4>
                                <ul className="list-disc ml-5 space-y-1">
                                    {tip.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* How to Use This Cheatsheet */}
            <section>
                <h3 className="text-xl font-semibold mb-2">📌 How to Use This Cheatsheet</h3>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Identify the algorithm by examining loops, recursion, or data structures.</li>
                    <li>Match the observed pattern with the corresponding entry in the tables.</li>
                    <li>Count operations (for time) and memory usage (for space) to determine the complexity.</li>
                    <li>Simplify the expression by focusing on the dominant term using Big O notation.</li>
                </ol>
            </section>
        </div>
    );
};





const MainChart = () => {
    return <div className=" bg-gradient-to-br  from-gray-900 via-gray-800 to-black text-white">
        <div >
            <TimeSpaceComplexityCheatsheet />
        </div>

        <div>
            <TimeComplexityChart />
        </div>

    </div>
}

export default MainChart;
