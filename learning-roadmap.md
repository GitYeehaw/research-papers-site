# Algorithms → RL & Robotics Roadmap

**Goal:** Reach the mathematical and programming depth of a strong CS undergrad
applying to top grad programs in RL or robotics.

**Schedule:** ~1.5 hrs/day Mon–Sat + 5 hrs Sunday = **~14 hrs/week**

**Background:** Completed Calc 1, Calc 2, Calc 3, Linear Algebra,
Differential Equations, Probability 101.

**Total estimated time:** ~8.5 months (34 weeks)
*(Saved ~6 weeks by fast-tracking math — redistributed to deeper ML/RL content)*

---

## Hardware Setup

**MacBook M4 Air** — primary machine for writing, prototyping, and light training
- PyTorch runs via MPS (Metal) backend — not CUDA but fast enough for Phases 1–3
- Use for: all algorithms, math review, classical ML, basic neural nets, classical RL, planning code

**Desktop: RTX 5060 Ti 16GB VRAM + 64GB RAM** — training machine from Phase 3 onward
- Full CUDA support (Blackwell architecture) — nothing in this roadmap will saturate it
- 16GB VRAM comfortably covers all training tasks here and leaves room to experiment
- Use for: CNN/transformer training, deep RL (DQN, PPO), robot simulation (Gazebo, Isaac Sim)

**Recommended workflow:** Write and test code on the MacBook, push to the desktop
for real training runs. SSH from Mac → desktop is a natural research workflow.

**Before Phase 5 (Robotics):** Sort out the desktop OS.
- Windows → set up WSL2 with Ubuntu 22.04 for ROS 2
- Already Linux → you're set
- Best option → dual boot Ubuntu if you want zero friction

| Phase | MacBook | Desktop |
|-------|---------|---------|
| 1 — Algorithms | ✓ Only machine needed | — |
| 2 — Math review | ✓ Only machine needed | — |
| 3 — Classical ML | ✓ Only machine needed | — |
| 3 — Neural nets (basic) | ✓ Fine, slightly slower | Nice to have |
| 3 — CNNs / Transformers | Slow | ✓ Use this |
| 4 — Classical RL | ✓ Only machine needed | — |
| 4 — Deep RL | ✓ Fine for CartPole | ✓ Anything larger |
| 5 — Kinematics / Planning | ✓ Only machine needed | — |
| 5 — Simulation (Isaac/Gazebo) | Won't run it | ✓ Required |

---

## How to Use This File
- Work through phases in order — each builds on the last
- Check off topics as you complete them
- Retention tests are marked with **[TEST]** — do these on paper or in a notebook
  before moving on. They check whether you actually still have the math.
- Use Sundays for longer problem sets, derivations, and paper reading
- Come back to Claude with specific problems, derivations, or concepts

---

## Phase 1 — Algorithms & Data Structures in Python
**Weeks 1–7 | ~98 hours**

The foundation. Every phase after this assumes you can think algorithmically
and write clean Python.

### Week 1–2: Core Data Structures & Patterns
- [ ] Arrays, strings, hash maps, sets
- [ ] Two-pointer technique
- [ ] Sliding window
- [ ] Stack and queue
- [ ] LeetCode: solve 15–20 Easy problems

### Week 3: Recursion & Sorting
- [ ] Recursion and the call stack
- [ ] Divide and conquer
- [ ] Merge sort (implement from scratch)
- [ ] Quick sort (implement from scratch)
- [ ] Heap sort + binary search

### Week 4–5: Trees & Graphs
- [ ] Binary trees, BSTs, heaps
- [ ] DFS (recursive + iterative)
- [ ] BFS and level-order traversal
- [ ] Topological sort
- [ ] Dijkstra's shortest path
- [ ] Union-Find (disjoint sets)

### Week 6–7: Dynamic Programming & Greedy
- [ ] Memoization vs tabulation
- [ ] Classic DP: knapsack, longest common subsequence, coin change
- [ ] Greedy algorithms and when they apply
- [ ] LeetCode: solve 10 Medium problems across all topics

**Phase 1 checkpoint:** You can implement any sorting algorithm from memory,
solve most LeetCode Mediums with some thought, and explain time/space complexity
for everything you write.

---

## Phase 2 — Math Review, Bridge & Scientific Python
**Weeks 8–10 | ~42 hours**

You've taken all of this. The goal is not to re-learn it — it's to:
1. Confirm you still have the crucial parts
2. Re-frame everything in the language ML/RL/robotics actually uses
3. Fill the gaps that undergrad courses typically leave (matrix calculus,
   information theory, convex optimization intuition)

Sundays in this phase are for retention tests. Do them on paper first.

### Week 8: Calculus — Retention & ML Bridge

**Re-frame:**
- [ ] Partial derivatives and the gradient as a vector of slopes
- [ ] The chain rule as the engine of backpropagation
- [ ] Jacobian matrices — gradient of a vector-valued function
- [ ] Hessian matrices — second derivatives, curvature, and why they matter
- [ ] Taylor series approximation — why gradient descent works locally
- [ ] Lagrange multipliers — constrained optimization (appears in RL theory)

**New (likely not in your courses):**
- [ ] Matrix calculus: gradient of a scalar w.r.t. a vector, ∂(xᵀAx)/∂x
- [ ] Gradient of common ML expressions: ||Xw - y||², log-likelihood

**[TEST] Sunday problem set — Calculus:**
1. Compute the gradient of L = (1/n)||Xw - y||² with respect to w. Show each step.
2. For a 2-layer network z = W₂·ReLU(W₁x + b₁) + b₂, use the chain rule to
   write out ∂L/∂W₁ symbolically.
3. Compute the Jacobian of the softmax function σ(z)ᵢ = eᶻⁱ/Σeᶻʲ.
4. Use a second-order Taylor expansion to explain why Newton's method converges
   faster than gradient descent near a minimum.
5. Set up the Lagrangian to find the maximum entropy distribution over a finite
   set subject to the constraint that probabilities sum to 1.

### Week 9: Linear Algebra — Retention & ML Bridge

**Re-frame:**
- [ ] Matrix multiplication as a composition of linear transformations
- [ ] Eigendecomposition: A = QΛQᵀ and what it means geometrically
- [ ] Positive definiteness and why it matters (covariance matrices, convexity)
- [ ] SVD: A = UΣVᵀ — understand each component
- [ ] Pseudo-inverse and least squares: A⁺ = VΣ⁺Uᵀ
- [ ] Rank, null space, and what they imply about solutions to Ax = b

**New (likely not in your courses):**
- [ ] Matrix norms: Frobenius norm, spectral norm — used in regularization
- [ ] Condition number — why poorly conditioned matrices cause numerical issues
- [ ] Trace and its properties: tr(AB) = tr(BA), tr(AᵀA) = ||A||²_F
- [ ] PCA derived from first principles via SVD

**[TEST] Sunday problem set — Linear Algebra:**
1. Implement PCA from scratch in NumPy (no sklearn). Apply it to a toy 2D dataset
   and plot the principal components.
2. Prove that for a symmetric matrix A, eigenvectors corresponding to distinct
   eigenvalues are orthogonal.
3. A covariance matrix Σ must be positive semi-definite. Prove this from the
   definition Σ = E[(x - μ)(x - μ)ᵀ].
4. Show that the solution to min||Ax - b||² is x = A⁺b when A has full column rank.
5. Given a matrix A, compute its SVD by hand (use a 2×2 example). Verify that
   A = UΣVᵀ.

### Week 10: Probability & Statistics — Retention + Information Theory

**Re-frame:**
- [ ] Bayes' theorem in the form of belief updating — you'll use this constantly
- [ ] Conditional independence and the Markov property (foundation of MDPs)
- [ ] Expectation of a function of a random variable: E[f(X)]
- [ ] Variance, covariance, correlation — and their matrix forms
- [ ] Common distributions in ML: Gaussian, Bernoulli, Categorical, Dirichlet

**New (likely gaps from Prob 101):**
- [ ] Maximum Likelihood Estimation (MLE) — derive for Gaussian and Bernoulli
- [ ] Maximum A Posteriori (MAP) — MLE with a prior; equivalent to regularization
- [ ] Information theory: entropy H(X), cross-entropy, KL divergence D_KL(P||Q)
- [ ] Why cross-entropy loss = negative log-likelihood for classification
- [ ] Moment generating functions (brief — used in convergence proofs)

**[TEST] Sunday problem set — Probability:**
1. Derive the MLE for the parameters (μ, σ²) of a Gaussian distribution.
   Show that σ²_MLE is biased.
2. Show that L2 regularization (||w||²) in linear regression corresponds to
   MAP estimation with a Gaussian prior on w.
3. Prove that KL divergence D_KL(P||Q) ≥ 0 using Jensen's inequality.
4. A robot localizes itself using Bayes' filter. Write out the predict and
   update steps in terms of probability distributions.
5. Compute H(X) for a fair 6-sided die. Then compute D_KL(P||Q) where P is
   the fair die and Q is loaded with P(6) = 0.5 and all others equal.

### Scientific Python (Weeks 8–10, parallel to review)
- [ ] NumPy: arrays, broadcasting, vectorized ops, np.linalg (eig, svd, solve)
- [ ] Matplotlib: line plots, scatter, histograms, heatmaps, subplots
- [ ] SciPy: optimize.minimize, stats distributions, sparse matrices
- [ ] Pandas: DataFrames, groupby, merge — just enough for data wrangling

**Phase 2 checkpoint:** You pass all three Sunday test sets. You can implement
PCA from scratch, derive MLE for a Gaussian, and explain KL divergence to
someone. If you struggled with any test, spend an extra day on that topic before
moving on — a gap here will compound badly in Phase 4.

---

## Phase 3 — Machine Learning Fundamentals
**Weeks 11–21 | ~154 hours**

*(Extra 2 weeks vs original — used for deeper neural network content and a
capstone project at the end.)*

Now the math pays off. You're not learning ML from a library — you're
understanding it from first principles and then using the library.

### Week 11–13: Classical ML (3 weeks)
- [ ] Linear regression — implement gradient descent from scratch, then derive
      the closed-form solution via the normal equations
- [ ] Logistic regression — implement from scratch using cross-entropy loss
- [ ] Regularization: L1 (Lasso), L2 (Ridge) — derive the effect on the solution
- [ ] K-nearest neighbors and K-means clustering — implement both
- [ ] Decision trees: information gain and Gini impurity
- [ ] Bias-variance tradeoff — understand it mathematically, not just intuitively
- [ ] Cross-validation, train/val/test discipline
- [ ] Scikit-learn: fit a real dataset end to end (e.g., UCI ML repo)

**[TEST]:** Implement linear regression two ways — gradient descent and normal
equations — and prove they converge to the same solution.

### Week 14–17: Neural Networks & Deep Learning (4 weeks)
- [ ] Perceptron and multi-layer perceptrons (MLP)
- [ ] Backpropagation: derive it from the chain rule, implement from scratch
      in pure NumPy (no PyTorch yet) on a small XOR problem
- [ ] Activation functions: ReLU, sigmoid, tanh, softmax — and their gradients
- [ ] Loss functions: MSE, cross-entropy — connect back to MLE/MAP
- [ ] Gradient descent variants: SGD, momentum, Adam — understand Adam's update
- [ ] PyTorch: tensors, autograd, nn.Module, DataLoader, training loop
- [ ] Train an image classifier on MNIST or CIFAR-10
- [ ] Convolutional networks: convolution as a linear operation, parameter sharing
- [ ] Overfitting: dropout (derive the noise interpretation), batch normalization,
      early stopping

**[TEST]:** Implement a 2-layer MLP with backprop in NumPy. No autograd.
Train it on MNIST and hit >95% accuracy.

### Week 18–19: Advanced Architectures (2 weeks)
- [ ] Sequence models: RNNs and the vanishing gradient problem (connect to eigvals)
- [ ] LSTMs: understand the gating mechanism and why it helps
- [ ] Self-attention: derive scaled dot-product attention from scratch
- [ ] Transformer architecture: multi-head attention, positional encoding, FFN
- [ ] Read "Attention Is All You Need" (Vaswani et al. 2017)
- [ ] Generative models motivation: why we need to model distributions over outputs,
      not just point estimates (crucial for robotics — multimodal action distributions)
- [ ] Denoising Diffusion Probabilistic Models (DDPMs): the forward noising process
      q(xₜ|xₜ₋₁), the reverse denoising process pθ(xₜ₋₁|xₜ), and the training
      objective (predict the noise ε)
- [ ] Score matching intuition: why "predict the gradient of the log-density" and
      "predict the noise" are equivalent objectives
- [ ] DDIM: deterministic sampling, how to speed up inference from 1000 → 50 steps
- [ ] Read: "Denoising Diffusion Probabilistic Models" (Ho et al. 2020)

### Week 20–21: Capstone + Consolidation (2 weeks)
- [ ] Build a project that uses at least 2 algorithms from Phase 1 and a trained
      model: e.g., a paper recommender, anomaly detector, or image classifier
      with a custom architecture
- [ ] Implement one optimizer (Adam) from scratch and verify it matches PyTorch
- [ ] Read one more paper of your choice from ML (NeurIPS or ICML)

**Phase 3 checkpoint:** You can implement backpropagation from scratch, explain
why Adam converges faster than SGD, and train models that achieve competitive
accuracy on standard benchmarks.

---

## Phase 4 — Reinforcement Learning
**Weeks 22–30 | ~126 hours**

*(Extra 2 weeks vs original — used for model-based RL and a stronger theoretical
foundation.)*

### Week 22–23: MDP Theory (2 weeks)
- [ ] States, actions, rewards, policies, episodes vs continuing tasks
- [ ] Markov property — connect to conditional independence from probability
- [ ] Return (cumulative reward) and discount factor γ — why discount?
- [ ] State-value function V^π(s) and action-value function Q^π(s,a)
- [ ] Bellman expectation equations — derive from the definition of V^π
- [ ] Bellman optimality equations — derive V* and Q*
- [ ] Read Sutton & Barto Chapters 1–4

**[TEST]:** On paper, derive the Bellman expectation equation for V^π starting
only from the definition V^π(s) = E_π[Gₜ | Sₜ = s]. No looking at notes.

### Week 24–25: Classical RL (2 weeks)
- [ ] Dynamic programming: policy evaluation, policy iteration, value iteration
- [ ] Why DP requires a model (transition probabilities) — contrast with model-free
- [ ] Monte Carlo methods: first-visit and every-visit MC prediction
- [ ] Monte Carlo control with exploring starts
- [ ] Temporal Difference learning: TD(0) prediction
- [ ] Q-learning: off-policy TD control — implement from scratch
- [ ] SARSA: on-policy TD control — implement and contrast with Q-learning
- [ ] Implement Q-learning on a GridWorld environment (code it yourself, no gym)

**[TEST]:** Implement value iteration on a simple MDP from scratch. Verify the
resulting policy is optimal by checking the Bellman optimality conditions.

### Week 26–27: Deep RL (2 weeks)
- [ ] Why tabular RL breaks at scale — curse of dimensionality
- [ ] Function approximation with neural networks
- [ ] DQN: experience replay and target networks — understand why both are needed
      for stability (connect to supervised learning stability)
- [ ] Implement DQN in PyTorch on CartPole (Gymnasium)
- [ ] Policy gradient theorem — derive it (uses expectations from probability)
- [ ] REINFORCE algorithm — implement from scratch
- [ ] Actor-Critic (A2C): combine value estimation with policy gradients

**Resource:** Spinning Up in Deep RL (OpenAI) — read the intro essays carefully

**[TEST]:** Derive the policy gradient theorem. Start from J(θ) = E_τ[R(τ)] and
end at ∇J(θ) = E_π[∇logπ(a|s) · Q^π(s,a)].

### Week 28–29: Advanced RL (2 weeks)
- [ ] PPO: understand the clipped surrogate objective and why it improves stability
- [ ] Entropy regularization and maximum entropy RL
- [ ] Model-based RL: Dyna architecture, world models (conceptual)
- [ ] Reward shaping, potential-based shaping, sparse vs dense rewards
- [ ] Exploration: ε-greedy, UCB, Thompson sampling, curiosity-driven
- [ ] Multi-agent RL: cooperative vs competitive settings (conceptual)
- [ ] Read: DQN paper (Mnih 2015), PPO paper (Schulman 2017)

### Week 30: Capstone (1 week)
- [ ] Train an agent to solve LunarLander-v2 or BipedalWalker using PPO
- [ ] Log training curves, diagnose and fix at least one instability
- [ ] Write a 1-page summary of what broke and why — good practice for research

**Phase 4 checkpoint:** You can derive the Bellman equations and policy gradient
theorem from scratch, implement Q-learning and REINFORCE in PyTorch, and train
agents that solve standard Gymnasium environments.

---

## Phase 5 — Robotics Fundamentals
**Weeks 31–34 | ~56 hours**

*(Tightened to 4 weeks — diff eq background makes dynamics much faster.)*

Robotics is where RL meets the physical world. Your diff eq background is a
genuine advantage here — most of this math will feel familiar.

### Week 31: Geometry & Kinematics
- [ ] Coordinate frames and rigid body transforms
- [ ] Rotation matrices, SO(3), and why they can't be added like vectors
- [ ] Quaternions — what they represent, why they beat Euler angles (gimbal lock)
- [ ] Homogeneous transforms (SE(3)) — 4×4 matrix representation
- [ ] Forward kinematics for a serial robot arm (Denavit-Hartenberg convention)
- [ ] Inverse kinematics — numerical methods via Jacobian pseudoinverse
      (connect to pseudo-inverse from Phase 2)

**Resource:** "Modern Robotics" by Lynch & Park (free PDF + Coursera)

**[TEST]:** Derive the forward kinematics of a 3-DOF planar arm from scratch.
Then set up the Jacobian and describe how you'd numerically solve IK.

### Week 32: Dynamics & Control
- [ ] Newton-Euler equations for rigid bodies
- [ ] Lagrangian mechanics for robot arms — connect to your diff eq course
- [ ] State-space representation: ẋ = Ax + Bu, y = Cx — you know this
- [ ] Linearization around an equilibrium point
- [ ] PID control: implement and tune on a simulated pendulum
- [ ] Stability analysis via eigenvalues of A — you know this from diff eq
- [ ] LQR (Linear Quadratic Regulator) — optimal control, connects to RL

### Week 33: Motion Planning
- [ ] Configuration space (C-space) vs workspace — crucial conceptual distinction
- [ ] A* on a 2D grid — implement from scratch (reuse Phase 1 graph skills)
- [ ] RRT (Rapidly-exploring Random Tree) — implement a basic version
- [ ] Probabilistic roadmaps (PRM) — conceptual
- [ ] Trajectory optimization basics

**[TEST]:** Implement A* on a grid with obstacles. Then implement RRT on the same
grid and compare solution quality and runtime.

### Week 34: Perception + ROS 2
- [ ] Pinhole camera model and projection
- [ ] Camera calibration: intrinsic and extrinsic parameters
- [ ] OpenCV basics: edge detection, feature matching (ORB, SIFT)
- [ ] Point clouds and depth images (conceptual + Open3D brief tour)
- [ ] ROS 2: nodes, topics, services — write a publisher/subscriber in Python
- [ ] Visualize a robot's sensor data in RViz

**Phase 5 checkpoint:** You can derive forward kinematics, set up state-space
equations for a simple robot, implement A* and RRT, and write a working ROS 2 node.

---

## Phase 6 — Robot Learning Frontiers
**Week 35–36 | ~28 hours**

Diffusion policies and VLAs are the two dominant paradigms in top lab robotics
research right now. Phase 3 (diffusion theory) and Phase 5 (robotics context)
are both prerequisites — don't skip ahead here.

### Week 35: Diffusion Policy
- [ ] Why standard behavior cloning fails for multimodal action distributions —
      understand this problem concretely before reading the solution
- [ ] Diffusion Policy: treat action prediction as a denoising problem in action
      space; understand the network architecture (U-Net on action sequences)
- [ ] CNN-based vs transformer-based Diffusion Policy variants
- [ ] Implicit vs explicit energy-based models — why diffusion beats IBC
- [ ] Read: "Diffusion Policy: Visuomotor Policy Learning via Action Diffusion"
      (Chi et al. 2023)
- [ ] Implement a minimal diffusion policy on a toy 2D action prediction task

**[TEST]:** Explain in writing why a Gaussian action head fails when a robot task
has two equally valid solutions (e.g., grasp from left or right). Then explain
exactly how a diffusion model avoids this failure.

### Week 36: Vision-Language-Action Models
- [ ] Vision Transformer (ViT): patch embeddings, class token — extend your
      transformer knowledge to images; understand why ViT replaced CNNs at scale
- [ ] CLIP: contrastive pretraining on (image, text) pairs; cosine similarity in
      the shared embedding space; zero-shot transfer
- [ ] How VLAs are built: a pretrained VLM backbone (e.g., PaLI, LLaVA) with
      action tokens appended to the vocabulary; co-training on internet data +
      robot demonstrations
- [ ] Action tokenization: how continuous actions are discretized into tokens and
      why this matters for autoregressive generation
- [ ] Emergent generalization: what "transfer from internet data" actually means
      in practice — positive and negative results
- [ ] Read: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to
      Robotic Control" (Brohan et al. 2023)
- [ ] Read: "OpenVLA: An Open-Source Vision-Language-Action Model" (Kim et al. 2024)
- [ ] Read: "π0: A Vision-Language-Action Flow Model for General Robot Control"
      (Black et al. 2024) — combines VLA with flow matching (diffusion variant)

**[TEST]:** Compare RT-2 and OpenVLA on three dimensions: architecture, training
data, and compute requirements. Write a paragraph on what each trades off.

**Phase 6 checkpoint:** You can explain why diffusion policies outperform Gaussian
behavior cloning on contact-rich tasks, implement a toy diffusion policy, and
describe the full stack of a VLA from image input to action output.

---

## Timeline Summary

| Phase | Content | Weeks | Cumulative |
|-------|---------|-------|------------|
| 1 | Algorithms & Data Structures | 1–7 | Month 2 |
| 2 | Math Review + Scientific Python | 8–10 | Month 2.5 |
| 3 | Machine Learning (deeper) | 11–21 | Month 5.5 |
| 4 | Reinforcement Learning (deeper) | 22–30 | Month 7.5 |
| 5 | Robotics | 31–34 | Month 8.5 |
| 6 | Robot Learning Frontiers | 35–36 | Month 9 |

---

## Retention Test Quick Reference

| Test | Location | Core Skill Checked |
|------|----------|--------------------|
| Gradient derivations | Phase 2, Week 8 | Chain rule, matrix calculus |
| PCA from scratch | Phase 2, Week 9 | Eigendecomposition, SVD |
| MLE + KL divergence | Phase 2, Week 10 | Probability, information theory |
| Linear regression two ways | Phase 3, Week 11–13 | LinAlg + calculus in practice |
| Backprop in NumPy | Phase 3, Week 14–17 | Derivatives + implementation |
| Bellman derivation | Phase 4, Week 22–23 | MDP math, expectations |
| Value iteration | Phase 4, Week 24–25 | DP + optimality conditions |
| Policy gradient derivation | Phase 4, Week 26–27 | Expectations, log trick |
| Forward kinematics | Phase 5, Week 31 | Geometry + linear algebra |
| A* + RRT | Phase 5, Week 33 | Graph algorithms + planning |

---

## Key Resources

| Topic | Resource | Cost |
|-------|----------|------|
| Matrix calculus | "The Matrix Calculus You Need for Deep Learning" (Parr & Howard) | Free PDF |
| Information theory | Cover & Thomas Ch. 1–2 | Free via library |
| Algorithms | LeetCode + "Algorithms" by Sedgewick | Free/paid |
| ML Theory | "Pattern Recognition & ML" by Bishop | Free PDF |
| PyTorch | PyTorch official tutorials | Free |
| RL | Sutton & Barto (free PDF) + Spinning Up | Free |
| Deep RL | CS285 Berkeley (YouTube lectures, free) | Free |
| Robotics | "Modern Robotics" Lynch & Park + Coursera | Free |
| Diffusion models | Ho et al. 2020 (DDPM paper, arXiv) | Free |
| Diffusion Policy | Chi et al. 2023 (arXiv) | Free |
| VLAs | RT-2, OpenVLA, π0 papers (arXiv) | Free |
| Papers | arXiv.org | Free |

---

## What Grad Schools Actually Want to See

Beyond knowing the material, strong applicants to top programs typically have:
- At least one research project or paper (even an undergrad one)
- Ability to read and implement algorithms directly from a paper
- Some real data or real hardware experience
- Evidence of independent curiosity — not just coursework

The capstone projects at the end of Phases 3 and 4 are the start of this.

---

*Last updated: Feb 2026 — added Phase 6: Diffusion Policy + VLAs*
