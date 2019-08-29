import { notification } from 'antd'

interface notificationType {
    message?: string,
    description: string,
    duration?: number
}

class Notification {
    error({ message = '提示', description = '', duration = 1 }: notificationType) {
        const args = {
            message,
            description,
            duration,
        }
        notification.error(args);
    }
    success({ message = '提示', description = '', duration = 1 }: notificationType) {
        const args = {
            message,
            description,
            duration,
        }
        notification.success(args);
    }
}

export default new Notification()