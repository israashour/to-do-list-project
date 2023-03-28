<template>
    <div class="container" style="max-width: 600px">
        <h1>To-Do List</h1>
        <div class="task-list">
            <div class="task-group">
                <h2>Pending</h2>
                <draggable class="task-items" :list="pendingTasks" @end="onDragEnd">
                    <div v-for="(task, index) in pendingTasks" :key="index" class="task-item">{{ task.title }}</div>
                </draggable>
            </div>
            <div class="task-group">
                <h2>In Progress</h2>
                <draggable class="task-items" :list="inProgressTasks" @end="onDragEnd">
                    <div v-for="(task, index) in inProgressTasks" :key="index" class="task-item">{{ task.title }}</div>
                </draggable>
            </div>
            <div class="task-group">
                <h2>Completed</h2>
                <draggable class="task-items" :list="completedTasks" @end="onDragEnd">
                    <div v-for="(task, index) in completedTasks" :key="index" class="task-item">{{ task.title }}</div>
                </draggable>
            </div>
        </div>
    </div>
</template>
  
<script>
import draggable from 'vuedraggable'

export default {
    name: 'TaskList',
    components: {
        draggable
    },
    data() {
        return {
            pendingTasks: [
                { title: 'Task 1', status: 'pending' },
                { title: 'Task 2', status: 'pending' },
                { title: 'Task 3', status: 'pending' }
            ],
            inProgressTasks: [
                { title: 'Task 4', status: 'in-progress' },
                { title: 'Task 5', status: 'in-progress' }
            ],
            completedTasks: [
                { title: 'Task 6', status: 'completed' }
            ]
        }
    },
    methods: {
        onDragEnd(event) {
            // Get the source and destination task groups
            const sourceGroup = this.getTaskGroup(event.source)
            const destinationGroup = this.getTaskGroup(event.destination)

            // Get the task that was moved
            const movedTask = sourceGroup[event.oldIndex]

            // Update the task's status based on its new position
            if (destinationGroup === this.pendingTasks) {
                movedTask.status = 'pending'
            } else if (destinationGroup === this.inProgressTasks) {
                movedTask.status = 'in-progress'
            } else if (destinationGroup === this.completedTasks) {
                movedTask.status = 'completed'
            }

            // Remove the task from the source group and add it to the destination group
            sourceGroup.splice(event.oldIndex, 1)
            destinationGroup.splice(event.newIndex, 0, movedTask)
        },
        getTaskGroup(element) {
            // Find the parent task group element
            let taskGroupElement = element
            while (taskGroupElement && !taskGroupElement.classList.contains('task-group')) {
                taskGroupElement = taskGroupElement.parentElement
            }

            // Get the task group based on its index
            const taskGroupIndex = Array.from(taskGroupElement.parentElement.children).indexOf(taskGroupElement)
            if (taskGroupIndex === 0) {
                return this.pendingTasks
            } else if (taskGroupIndex === 1) {
                return this.inProgressTasks
            } else if (taskGroupIndex === 2) {
                return this.completedTasks
            }
        }
    }
}
</script>

<style>
.task-list {
    display: flex;
}

.task-group {
    margin-right: 20px;
}

.task-group h2 {
    margin-top: 0;
}

.task-item {
    background-color: #f5f5f5;
    border-radius: 4px;
    cursor: move;
    margin-bottom: 10px;
    padding: 10px;
}
</style>

  