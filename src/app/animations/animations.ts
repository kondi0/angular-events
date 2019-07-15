import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
    transition('* => *', [
        query(
            ':enter',
            [
                style({ opacity: 0 }),
                stagger(100, [
                    animate(100, style({ transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 0 })),
                    animate(100, style({ transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.2 })),
                    animate(100, style({ transform: 'scale3d(.9, .9, .9)', offset: 0.4 })),
                    animate(100, style({ transform: 'scale3d(1.03, 1.03, 1.03)', opacity: '1', offset: 0.6 })),
                    animate(100, style({ transform: 'scale3d(.97, .97, .97)', offset: 0.8 })),
                    animate(100, style({ transform: 'scale3d(1, 1, 1)', opacity: '1', offset: 1 }))
                ])
            ],
            { optional: true }
        )
    ])
]);
