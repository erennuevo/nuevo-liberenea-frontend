<!--
=============================================================
  DAY 1 ASSIGNMENT — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (if you finish early)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup>
import { ref, computed } from 'vue'

// [x] TODO 1: Create a ref for the text input value (initial value: '')
const newTaskName = ref('')

// [x] TODO 2: Create a ref for the tasks array (initial value: [])
const tasks = ref([])

// BONUS 3: Ref for priority level
const newPriority = ref('Low')

// TODO 3: Create computed() values for total, done, and pending counts
const totalCount  = computed(() => tasks.value.length)
const doneCount   = computed(() => tasks.value.filter(task => task.done === true).length)
const pendingCount = computed(() => tasks.value.filter(task => task.done === false).length)

// [x] TODO 4: Write the addTask() function
// - Prevent empty tasks
// - Push a new task object to tasks.value: { id, name, done }
// - Clear the input
function addTask() {
  if (newTaskName.value.trim().length === 0) {
    window.alert("Please enter a valid task.")
    return
  }
  tasks.value.push(
    {
        id: Date.now(),
        name: newTaskName.value,
        done: false,
				priority: newPriority.value
    }
  )
  newTaskName.value = ''
}

// [x] TODO 5: Write toggleTask(id) — flip task.done for the matching task
function toggleTask(id) {
  const task = tasks.value.find(task => task.id === id)
  task.done = !task.done
}

// [x] TODO 6: Write removeTask(id) — filter out the task with this id
function removeTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

// BONUS 1: Filter completed and pending tasks
// Ref for filter
const filter = ref('all')

// Helper function to change current filter
function setFilter(inputFilter) {
	filter.value = inputFilter
}

// Return a filtered list based on currently selected filter
const filteredTasks = computed(() => {
	if (filter.value === 'all') {
		return tasks.value
	}
	else if (filter.value === 'done') {
		return tasks.value.filter(task => task.done === true)
	}
	else if (filter.value === 'pending') {
		return tasks.value.filter(task => task.done === false)
	}
})

// BONUS 2: Clear all done tasks
// Filter out the task list to include only unfinished tasks
function clearDone() {
	tasks.value = tasks.value.filter(task => task.done === false)
}

</script>

<template>
	<div class="bg">
		<!-- Animated boxes -->
		<div class="box">
			<div v-for="box in 10" :key="box"></div>
		</div>

		<div class="app">
			<h1>Task Counter</h1>
			
			<!-- [x] TODO 7: Add an input with v-model, @keyup.enter, and placeholder -->
			<!-- TODO 8: Add an "Add Task" button with @click="addTask" -->
			<div class="input-row">
				<!-- your input and button here -->
				<input v-model="newTaskName" @keyup.enter="addTask" placeholder="Add a task"/>
				<button @click="addTask">Add</button>
			</div>

			<div class="filters">
				<button :class="{ active: filter === 'all'}" @click="setFilter('all')">All</button>
				<button :class="{ active: filter === 'done'}" @click="setFilter('done')">Done</button>
				<button :class="{ active: filter === 'pending'}" @click="setFilter('pending')">Pending</button>
			</div>

			<!-- TODO 9: Display the stats bar using your computed values -->
			<!-- Format: Total: X | Done: X | Pending: X -->
			<div class="stats">
				<!-- your stats here -->
				<span>Total: {{ totalCount }} | </span>
				<span>Done: {{ doneCount }} | </span>
				<span>Pending: {{ pendingCount }}</span>
			</div>

			<!-- [x] TODO 10: Show this message only when the task list is empty -->
			<!-- <p class="empty">No tasks yet. Add one above!</p> -->
			<span v-if="tasks.length == 0">No tasks yet. Add one above!</span>

			<!-- [x] TODO 11: Render the task list using v-for -->
			<!-- Each item needs: checkbox (v-model), task name (:class done), remove button -->
			<ul class="task-list">
				<li v-for="(task, id) in filteredTasks" :key="task.id">

					<input type="checkbox" v-model="task.done"/>

					<span :class="{done: task.done}">{{ task.name }}</span>

					<select v-model="task.priority" :class="task.priority">
						<option disabled value="">Priority</option>
						<option value="high">High</option>
						<option value="medium">Medium</option>
						<option value="low">Low</option>
					</select>

					<button @click="removeTask(task.id)">X</button>
				</li>
			</ul>

			<div>
				<button class="clear-button" @click="clearDone">Clear All Done</button>
			</div>
  </div>
	</div>
</template>

<style scoped>

.bg {
	background: linear-gradient(0deg, white 0%, rgb(255, 255, 208) 50%, rgb(192, 232, 255) 100%);
  width: 100%;
  position: absolute;
  margin: 0;
  padding: 40px 20px;
	overflow: hidden
}

.box div{
	position: absolute;
	width: 60px;
	height: 60px;
	background-color: transparent;
	border: 6px solid rgb(149, 204, 209);
}

.box div:nth-child(1){
	top: 12%;
	left: 90%;
	animation: animate 10s linear infinite;
}

.box div:nth-child(2){
	top: 70%;
	left: 80%;
	animation: animate 7s linear infinite;
}

.box div:nth-child(3){
	top: 25%;
	left: 8%;
	animation: animate 9s linear infinite;
}

.box div:nth-child(4){
	top: 30%;
	left: 20%;
	animation: animate 8s linear infinite;
}

.box div:nth-child(5){
	top: 9%;
	left: 10%;
	animation: animate 10s linear infinite;
}

.box div:nth-child(6){
	top: 82%;
	left: 5%;
	animation: animate 12s linear infinite;
}

.box div:nth-child(7){
	top: 92%;
	left: 80%;
	animation: animate 11s linear infinite;
}

.box div:nth-child(8){
	top: 64%;
	left: 70%;
	animation: animate 10s linear infinite;
}

.box div:nth-child(9){
	top: 60%;
	left: 15%;
	animation: animate 11s linear infinite;
}

.box div:nth-child(10){
	top: 43%;
	left: 78%;
	animation: animate 8s linear infinite;
}

@keyframes animate{
	0%{
		transform: scale(0) translateY(0) rotate(0);
		opacity: 1;
	}
	100%{
		transform: scale(1.3) translateY(-90px) rotate(360deg);
		opacity: 0;
	}
}

.app {
  margin: 40px auto;
  font-family: Arial, sans-serif;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
	max-width: 30%;
}

h1 { color: #1B2A4A; margin-bottom: 20px; }

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-row button {
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.stats {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
}

.empty {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 32px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.task-list li span {
  flex: 1;
  font-size: 14px;
}

/* [x] TODO: Apply this class to task names when task.done is true */
.done {
  text-decoration: line-through;
  color: #aaa;
}

.task-list li button {
  padding: 4px 10px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.filters {
	display: flex;
	gap: 5px;
	justify-content: center;
	margin-bottom: 16px;
}

.filters button {
  padding: 6px 16px;
  background-color: #ededed;
  color: #474747;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  transition: all 0.2s ease;
}

.filters button.active {
  background-color: #42B883;
	border: none;
	border-radius: 4px;
  color: white;
}

select {
	border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
	padding: 4px;
	background-color: #f6f6f6;
}

select.high {
	background-color: rgb(255, 203, 203);
	color: rgb(134, 19, 19)
}

select.medium {
	background-color: rgb(255, 235, 173);
	color: rgb(143, 111, 17)
}

select.low {
	background-color: rgb(175, 224, 181);
	color: rgb(17, 92, 26)
}

.clear-button {
	margin: 10px;
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

</style>