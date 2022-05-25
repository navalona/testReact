const taskService = {
    getListTask: async () => {
        try {
            const response = await fetch('url');
            const json = await response.json();
            if (json.ok) {
                return json.data
            } else {
                return []
            }
        } catch (error) {
            console.log('error when post task');
            return { 'error': true }
        }
    },
    addTaskToList: async (task) => {
        try {
            const response = await fetch('url', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: task
            });
            const json = await response.json();
            if (json.ok) {
                console.log('ok sending');
            }
        } catch (error) {
            console.log('error when post task');
        }
    },
    removeFromList: async (task) => {
        try {
            const response = await fetch('url/' + task.id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                }
            });
            const json = await response.json();
            if (json.ok) {
                console.log('ok deleteing');
            }
        } catch (error) {
            console.log('error when deleting');
        }
    },
    editTaskFromList: async (task) => {
        try {
            const response = await fetch('url/' + task.id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                },
                body: task
            });
            const json = await response.json();
            if (json.ok) {
                console.log('ok editing');
            }
        } catch (error) {
            console.log('error when edit task');
        }
    }
}
export default taskService;